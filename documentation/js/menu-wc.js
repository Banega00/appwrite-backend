'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">appwrite-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' : 'data-bs-target="#xs-controllers-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' :
                                            'id="xs-controllers-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' : 'data-bs-target="#xs-injectables-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' :
                                        'id="xs-injectables-links-module-AppModule-3aa47e95b3c31e1df57a1c90e92677894fe82903cc71c7d1827938477b5f87e9996456a40f01dc760be51bdfbd168fb6b34e8ee763ab5bbb8d304f86e5a812b2"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppwriteModule.html" data-type="entity-link" >AppwriteModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' : 'data-bs-target="#xs-injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' :
                                        'id="xs-injectables-links-module-AppwriteModule-9ba90e6cab8d7d9f4b0961e30cec4cb4036fa07431e57c479d0278ef46a50e25b788a93eaf044f62b354a3dd41ed767ff2ce582e72759b26d67c8945b691c65f"' }>
                                        <li class="link">
                                            <a href="injectables/AppwriteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppwriteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' :
                                            'id="xs-controllers-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' :
                                        'id="xs-injectables-links-module-AuthModule-dfa81d17d4a2e943b845f871581b76be00a81e7b3405e4e674cb72cae81fd5c7c4eaac5a5cdaf03e2611588845aa50d58d6c9f29dd3bfdba9747885fc32b370c"' }>
                                        <li class="link">
                                            <a href="injectables/AppwriteSessionGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppwriteSessionGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationModule.html" data-type="entity-link" >ReservationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'data-bs-target="#xs-controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' :
                                            'id="xs-controllers-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' : 'data-bs-target="#xs-injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' :
                                        'id="xs-injectables-links-module-ReservationModule-b24e32f26df082418b7354554848391ea9392e2396b95bcb2022d85cdf46a24aed78e40112f0da6e04210d04e4aa70179cdc17bbc7cf5e36d248bf107afd0b0d"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReservationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SharedModule-d431cb4f4f5552be4f2e899c8735a5d1127be7221f2e0217ce79db834d1b6cda1f9cffac8468da60e4bc25849a21672b5e1d3c4ecc395b9ff59936633d23758b"' : 'data-bs-target="#xs-injectables-links-module-SharedModule-d431cb4f4f5552be4f2e899c8735a5d1127be7221f2e0217ce79db834d1b6cda1f9cffac8468da60e4bc25849a21672b5e1d3c4ecc395b9ff59936633d23758b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-d431cb4f4f5552be4f2e899c8735a5d1127be7221f2e0217ce79db834d1b6cda1f9cffac8468da60e4bc25849a21672b5e1d3c4ecc395b9ff59936633d23758b"' :
                                        'id="xs-injectables-links-module-SharedModule-d431cb4f4f5552be4f2e899c8735a5d1127be7221f2e0217ce79db834d1b6cda1f9cffac8468da60e4bc25849a21672b5e1d3c4ecc395b9ff59936633d23758b"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ContextService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContextService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomLoggingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomLoggingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HelpersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' :
                                            'id="xs-controllers-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' :
                                        'id="xs-injectables-links-module-UserModule-f7999503babe68fdb2f881181a103ca8f2b2c8de2cad521fd9bc0aa11d5192e642844ef45520cb978d130a9ba282d954f7388e1e833e488e8691a32982e4641e"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomError.html" data-type="entity-link" >CustomError</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalExceptionFilter.html" data-type="entity-link" >GlobalExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reservation.html" data-type="entity-link" >Reservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateReservationDto.html" data-type="entity-link" >UpdateReservationDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LoggingMiddleware.html" data-type="entity-link" >LoggingMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestLoggingInterceptor.html" data-type="entity-link" >RequestLoggingInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/envConfig.html" data-type="entity-link" >envConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});