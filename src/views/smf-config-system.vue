﻿﻿/* eslint-disable no-console */
<template lang="html">

    <section class="smf-config-system">

        <template>
            <div>
                <vue-headful title="smf :: config system"
                             description="SMF dashboard"
                             keywords="SMF, solosTec" />
            </div>
        </template>

        <b-jumbotron fluid :header="$t('header-system', {version: this.cfg.version })" :lead="$t('lead-system', {node: this.cfg.hostname})" />

        <b-container fluid>

            <b-card-group deck>

                <b-card :title="$t('config-sys-01')"
                        class="shadow">
                    <b-form-checkbox switch v-model="cfg.auto_login" name="check-button" v-on:change="autoLoginChange($event)">
                        {{ $t('config-sys-02') }}
                        <!-- Accept unknown devices and transfer the login data to the configuration database (not recommended). -->
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.auto_login}}</b></small></div>
                </b-card>

                <b-card :title="$t('config-sys-03')"
                        class="shadow">
                    <b-form-checkbox switch v-model="cfg.auto_enabled" name="check-button" v-on:change="autoEnabledChange($event)">
                        {{ $t('config-sys-04') }}
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.auto_enabled}}</b></small></div>
                </b-card>

                <b-card :title="$t('config-sys-05')" class="shadow">
                    <b-form-checkbox switch v-model="cfg.supersede" name="check-button" v-on:change="supersedeChange($event)">
                        {{ $t('config-sys-06') }}
                        <!-- New login terminates running session with same credentials (recommended). -->
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.supersede}}</b></small></div>
                </b-card>

                <b-card :title="$t('config-sys-18')" class="shadow">
                    <b-form-checkbox switch v-model="cfg.gwConfigCaching" name="check-button" v-on:change="gwCacheChange($event)">
                        {{ $t('config-sys-19') }}
                        <!-- cachinf gateway configuration data -->
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.gwConfigCaching}}</b></small></div>
                </b-card>

            </b-card-group>

            <br />

            <b-card-group deck>

                <b-card :title="$t('config-sys-14')" class="shadow">
                    <b-form-checkbox switch v-model="cfg.catch_meters" name="check-button" v-on:change="catchMetersChange($event)">
                        {{ $t('config-sys-15') }}
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.catch_meters}}</b></small></div>
                </b-card>

                <b-card :title="$t('config-sys-16')" class="shadow">
                    <b-form-checkbox switch v-model="cfg.catch_lora" name="check-button" v-on:change="catchLoRaChange($event)">
                        {{ $t('config-sys-17') }}
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.catch_lora}}</b></small></div>
                </b-card>

            </b-card-group>

            <br />

            <b-card-group deck>
                <b-card :title="$t('config-sys-07')" class="shadow">
                    <b-input-group class="mt-3">
                        <b-form-select v-model="cfg.countryCode" :options="country.options" v-on:change="countryCodeChange($event)" />
                        <b-button variant="secondary" @click="countryCodeChange(cfg.def.countryCode)">{{ $t('com-default') }}</b-button>
                    </b-input-group>

                    <!-- Maximum number of messages to be displayed. -->
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.countryCode}}</b></small></div>
                </b-card>
                <b-card :title="$t('config-sys-08')" class="shadow">
                    <!-- Language Code -->
                    <b-input-group class="mt-3">
                        <b-form-select v-model="cfg.languageCode" :options="language.options" v-on:change="languageCodeChange($event)" />
                        <b-button variant="secondary" @click="languageCodeChange(cfg.def.languageCode)">{{ $t('com-default') }}</b-button>
                    </b-input-group>

                    <!-- Maximum number of messages to be displayed. -->
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.languageCode}}</b></small></div>
                </b-card>
            </b-card-group>

            <br />

            <b-card-group deck>
                <b-card :title="$t('config-sys-09')" class="shadow">
                    <b-input-group prepend="max." class="mt-3">
                        <b-form-input v-model.number="cfg.maxMessages" type="number" min="10" max="10000" step="10" placeholder="<max. Messages>" />
                        <b-input-group-append>
                            <b-button variant="secondary" @click="cfg.maxMessages = cfg.def.maxMessages">{{ $t('com-default') }}</b-button>
                            <b-button variant="success" @click="changeMaxMessages(cfg.maxMessages)">{{ $t('config-sys-09-2') }}</b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <!-- Maximum number of messages to be displayed. -->
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.maxMessages}}</b></small></div>
                </b-card>

                <b-card :title="$t('config-sys-10')" class="shadow">
                    <b-input-group prepend="max." class="mt-3">
                        <b-form-input v-model.number="cfg.maxEvents" type="number" min="10" max="10000" step="10" placeholder="<max. Events>" />
                        <b-input-group-append>
                            <b-button variant="secondary" @click="cfg.maxEvents = cfg.def.maxEvents">{{ $t('com-default') }}</b-button>
                            <b-button variant="success" @click="changeMaxEvents(cfg.maxEvents)">{{ $t('config-sys-10-2') }}</b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <!-- Maximum number of events to be displayed. -->
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.maxEvents}}</b></small></div>
                </b-card>
            </b-card-group>

            <br />

            <b-card-group deck>

                <b-card :title="$t('config-sys-11')" class="shadow">
                    <b-form-checkbox switch v-model="cfg.tsdb" name="check-button" v-on:change="tsdbChange($event)">
                        {{ $t('config-sys-12') }} <b>{{cfg.tsdb_dir}}</b> {{ $t('config-sys-13') }}
                    </b-form-checkbox>
                    <div slot="footer"><small class="text-muted">{{ $t('com-default') }} = <b>{{cfg.def.tsdb}}</b></small></div>
                </b-card>

            </b-card-group>

            <br />

        </b-container>

        <b-container fluid>
            <b-card-group columns>

                <b-card header="System Info" header-bg-variant="info" header-text-variant="white" no-body>
                    <b-list-group flush>
                        <b-list-group-item>System Version: {{sys.version}}</b-list-group-item>
                        <b-list-group-item>Boost Version: {{sys.boostVersion}}</b-list-group-item>
                        <b-list-group-item>SSL Version: {{sys.sslVersion}}</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-group>

        </b-container>

    </section>

</template>

<script lang="js">

    import { webSocket } from '../mixins/web-socket'
    import { hasPrivilegesWaitForUser } from "../mixins/privileges";
    import store from "../store";
    import { MODULES, NO_ACCESS_ROUTE, PRIVILEGES } from "../store/modules/user";

    export default {
        name: 'smfConfigSystem',
        props: [],
        mixins: [webSocket],

        mounted() {
            this.ws_open("/smf/api/system/v0.8");
        },

        beforeDestroy() {
            this.ws_close();
        },

        data() {
            return {
                cfg: {
                    auto_login: false,
                    auto_enabled: true,
                    supersede: true,
                    tsdb: false,
                    tsdb_dir: '/',
                    maxMessages: 1000,
                    maxEvents: 2000,
                    catch_meters: false,
                    catch_lora: false,
                    hostname: location.hostname,
                    version: 'v0.0',
                    countryCode: '',
                    languageCode: '',
                    gwConfigCaching: true,
                    def: {
                        auto_login: false,
                        auto_enabled: true,
                        supersede: true,
                        tsdb: false,
                        maxMessages: 1000,
                        maxEvents: 2000,
                        catch_meters: false,
                        catch_lora: false,
                        countryCode: 'AU',
                        languageCode: 'EN',
                        gwConfigCaching: false,
                    }
                },
                sys: {
                    version: 'SMF/v0.0',
                    boostVersion: '',
                    sslVersion: ''
                },
                country: {
                    options: [
                        { value: 'AU', text: 'Australia' },
                        { value: 'AT', text: 'Austria' },
                        { value: 'CH', text: 'Switzerland' },
                        { value: 'DE', text: 'Germany' },
                        { value: 'FR', text: 'France' },
                        { value: 'GB', text: 'United Kingdom' }
                    ]
                },
                //  ISO 639-1
                language: {
                    options: [
                        { value: 'EN', text: 'english' },
                        { value: 'DE', text: 'deutsch' },
                        { value: 'ES', text: 'español' },
                        { value: 'FR', text: 'français' },
                        { value: 'RU', text: 'русский' },
                    ]
                }
            }
        },

        methods: {
            ws_on_open() {
                this.ws_subscribe("config.system");
            },
            ws_on_data(obj) {
                if (obj.cmd != null) {
                    // console.log(this.$options.name + ' websocket received ' + obj.cmd + ' / ' + obj.channel);
                    if (obj.cmd == 'insert') {
                        if (obj.rec.key.name == 'connection-auto-login') {
                            this.cfg.auto_login = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'connection-auto-enabled') {
                            this.cfg.auto_enabled = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'connection-superseed') {
                            this.cfg.supersede = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'gw-cache') {
                            this.cfg.gwConfigCaching = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'generate-time-series') {
                            this.cfg.tsdb = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'host-name') {
                            this.cfg.hostname = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == 'smf-version') {
                            this.cfg.version = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "connection-auto-login-default") {
                            this.cfg.def.auto_login = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "connection-auto-enabled-default") {
                            this.cfg.def.auto_enabled = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "connection-superseed-default") {
                            this.cfg.def.auto_supersede = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "generate-time-series-default") {
                            this.cfg.def.tsdb = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "generate-time-series-dir") {
                            // $("#smf-config-system-time-series-dir").html('<a href="file:///' + obj.rec.data.value + '">' + obj.rec.data.value + '</a>');
                            this.cfg.tsdb_dir = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "max-messages") {
                            this.cfg.maxMessages = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "max-events") {
                            this.cfg.maxEvents = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "catch-meters") {
                            this.cfg.catch_meters = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "catch-lora") {
                            this.cfg.catch_lora = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "country-code") {
                            this.cfg.countryCode = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "country-code-default") {
                            this.cfg.def.countryCode = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "language-code") {
                            this.cfg.languageCode = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "language-code-default") {
                            this.cfg.def.languageCode = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "catch-meters-default") {
                            this.cfg.def.catch_meters = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "catch-lora-default") {
                            this.cfg.def.catch_lora = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "sys-version") {
                            this.sys.version = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "boost-version") {
                            this.sys.boostVersion = obj.rec.data.value;
                        }
                        else if (obj.rec.key.name == "ssl-version") {
                            this.sys.sslVersion = obj.rec.data.value;
                        }
                        else {
                            console.log(this.$options.name + ' unhandled key ' + obj.cmd + ' / ' + obj.channel + ' / ' + obj.rec.key.name);
                        }
                    }
                    else if (obj.cmd == 'modify') {
                        //console.log('modify ' + obj.key[0] + ": " + obj.value);
                        if (obj.key[0] == 'connection-auto-login') {
                            //console.log("modify cfg.auto_login ", obj.value, typeof obj.value);
                            this.cfg.auto_login = obj.value;
                        }
                        else if (obj.key[0] == 'connection-auto-enabled') {
                            this.cfg.auto_enabled = obj.value;
                        }
                        else if (obj.key[0] == 'connection-superseed') {
                            this.cfg.supersede = obj.value;
                        }
                        else if (obj.key[0] == 'gw-cache') {
                            this.cfg.gwConfigCaching = obj.value;
                        }
                        else if (obj.key[0] == 'generate-time-series') {
                            this.cfg.tsdb = obj.value;
                        }
                        else if (obj.key[0] == 'max-messages') {
                            this.cfg.maxMessages = obj.value;
                        }
                        else if (obj.key[0] == 'max-events') {
                            this.cfg.maxEvents = obj.value;
                        }
                        else if (obj.key[0] == 'catch-meters') {
                            this.cfg.catch_meters = obj.value;
                        }
                        else if (obj.key[0] == 'catch-lora') {
                            this.cfg.catch_lora = obj.value;
                        }
                        else if (obj.key[0] == "country-code") {
                            this.cfg.countryCode = obj.value;
                        }
                        else if (obj.key[0] == "language-code") {
                            this.cfg.languageCode = obj.value;
                        }
                    }
                    // eslint-disable-next-line
                    else if (obj.cmd == 'load') {
                    }
                }
            },
            changeMaxMessages(newValue) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "max-messages" },
                    data: { value: newValue }
                });
            },
            changeMaxEvents(newValue) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "max-events" },
                    data: { value: newValue }
                });
            },
            autoLoginChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "connection-auto-login" },
                    data: { value: targetState }
                });
            },
            autoEnabledChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "connection-auto-enabled" },
                    data: { value: targetState }
                });
            },
            supersedeChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "connection-superseed" },
                    data: { value: targetState }
                });
            },
            gwCacheChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "gw-cache" },
                    data: { value: targetState }
                });
            },
            tsdbChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "generate-time-series" },
                    data: { value: targetState }
                });
            },
            catchMetersChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "catch-meters" },
                    data: { value: targetState }
                });
            },
            catchLoRaChange(targetState) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "catch-lora" },
                    data: { value: targetState }
                });
            },
            countryCodeChange(newValue) {
                console.log("new country code " + newValue);
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "country-code" },
                    data: { value: newValue }
                });
            },
            languageCodeChange(newValue) {
                this.ws_submit_record("modify", "config.system", {
                    key: { name: "language-code" },
                    data: { value: newValue }
                });
            },
        },

        computed: {
        },

        watch: {
        },

        beforeRouteEnter(to, from, next) {
            hasPrivilegesWaitForUser(store, MODULES.CONFIG_SYSTEM, PRIVILEGES.VIEW).then((result) => {
                next(result ? true : NO_ACCESS_ROUTE);
            });
        }
    }
</script>

<style scoped lang="css">
</style>
