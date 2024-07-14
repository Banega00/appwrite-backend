import { Injectable, OnModuleInit } from '@nestjs/common';
import { Account, Client, Databases, ID, Models, Permission, Query, Role, Users } from 'node-appwrite';
import { Reservation } from 'src/resources/reservation/entities/reservation.entity';
import { ConfigService } from 'src/shared/config/config.service';
import { ContextService } from 'src/shared/context/context.service';

@Injectable()
export class AppwriteService implements OnModuleInit {
  private adminClient: Client;
  private account: Account;

  private databaseId: string;
  private databases: Databases;
  private database: Models.Database;

  private requiredCollectionsMap: { [name: string]: { id: string } } = {
    reservations: { id: '' },
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly contextService: ContextService,
  ) {
    const appwriteConfig = this.configService.appwriteConfig;
    if (!appwriteConfig) {
      throw new Error('Appwrite configuration is missing');
    } else if (!appwriteConfig.APPWRITE_ENDPOINT) {
      throw new Error('Appwrite endpoint is missing');
    } else if (!appwriteConfig.APPWRITE_PROJECT_ID) {
      throw new Error('Appwrite project ID is missing');
    } else if (!appwriteConfig.APPWRITE_API_KEY) {
      throw new Error('Appwrite API key is missing');
    }

    this.adminClient = new Client();
    this.account = new Account(this.adminClient);
  }

  async onModuleInit() {
    const { APPWRITE_ENDPOINT, APPWRITE_API_KEY, APPWRITE_PROJECT_ID } = this.configService.appwriteConfig;

    this.adminClient = this.adminClient.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);

    //Set up the database
    this.databases = new Databases(this.adminClient);
    this.databaseId = this.configService.db.databaseId;
    if (!this.databaseId) {
      console.log('DatabaseId missing');
      console.log('Creating database');
      await this.createDatabase();
    }

    this.database = await this.databases.get(this.databaseId);

    const collections = await this.databases.listCollections(this.databaseId);
    for (const collectionName in this.requiredCollectionsMap) {
      const collection = collections.collections.find((c) => c.name === collectionName);
      if (!collection) {
        await this.createCollection(collectionName);
        console.log(`Collection ${collectionName} created`);
      } else {
        this.requiredCollectionsMap[collectionName].id = collections.collections.find((c) => c.name === collectionName).$id;
      }
    }
  }

  async createDatabase() {
    const response = await this.databases.create(ID.unique(), 'Default');
    this.databaseId = response.$id;
    console.log('Database created with ID: ', this.databaseId);
  }

  async createCollection(collectionName: string) {
    let createCollectionResponse: Models.Collection;
    if (collectionName == 'reservations') {
      createCollectionResponse = await this.databases.createCollection(
        this.databaseId, // ID of the collection
        ID.unique(), // Collection ID
        collectionName, // Collection Name
        [Permission.read(Role.any()), Permission.create(Role.users()), Permission.update(Role.users()), Permission.delete(Role.users())],
      );

      const dateAttributeResponse = await this.databases.createStringAttribute(this.databaseId, createCollectionResponse.$id, 'date', 255, true);

      const timeAttributeResponse = await this.databases.createStringAttribute(this.databaseId, createCollectionResponse.$id, 'time', 255, true);

      const datetimeAttributeResponse = await this.databases.createDatetimeAttribute(this.databaseId, createCollectionResponse.$id, 'datetime', true);

      const numberOfGuestsAttributeResponse = await this.databases.createIntegerAttribute(
        this.databaseId,
        createCollectionResponse.$id,
        'numberOfGuests',
        true,
        1,
      );

      const userIdAttributeResponse = await this.databases.createStringAttribute(this.databaseId, createCollectionResponse.$id, 'userId', 255, true);

      const specialRequestsAttributeResponse = await this.databases.createStringAttribute(
        this.databaseId,
        createCollectionResponse.$id,
        'specialRequests',
        255,
        false,
        null,
        true,
      );
    }
    this.requiredCollectionsMap[collectionName] = { id: createCollectionResponse.$id };
  }

  public async createAnonymousSession() {
    const account = new Account(this.adminClient);

    const anonymousSession = await account.createAnonymousSession();
    return anonymousSession;
  }

  async getUserFromSessionSecret(secret: string) {
    const sessionClient = new Client()
      .setEndpoint(this.configService.appwriteConfig.APPWRITE_ENDPOINT)
      .setProject(this.configService.appwriteConfig.APPWRITE_PROJECT_ID);

    sessionClient.setSession(secret);
    const account = new Account(sessionClient);
    const currentUser = await account.get();
    return currentUser;
  }

  async updateUser(userId: string, data: { email: string; password: string; name: string }) {
    const user = new Users(this.adminClient);

    const currentUser = await user.get(userId);

    currentUser.name != data.name && (await user.updateName(userId, data.name));
    currentUser.email != data.email && (await user.updateEmail(userId, data.email));
    currentUser.password != data.password && (await user.updatePassword(userId, data.password));
    return await user.get(userId);
  }

  async saveDocument<T extends Reservation>(collection: keyof typeof this.requiredCollectionsMap, document: Reservation): Promise<T> {
    const response = await this.databases.createDocument(this.databaseId, this.requiredCollectionsMap[collection].id, ID.unique(), document, [
      Permission.read(Role.any()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]);

    return response as T;
  }

  async getAllUserReservations(userId: string) {
    const reservations = await this.databases.listDocuments(this.databaseId, this.requiredCollectionsMap['reservations'].id, [
      Query.equal('userId', userId),
    ]);
    return reservations;
  }
}
