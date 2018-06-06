import { Component, Listen, Prop, State } from '@stencil/core';

import { MatchResults } from '@theracode/router';
import { urlB64ToUint8Array } from '../../utils';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
})
export class AppProfile {

  @Prop() name: string;
  @Prop() match: MatchResults;
  @State() notify: boolean;
  @State() swSupport: boolean;

  // demo key from https://web-push-codelab.glitch.me/
  // replace with your key in production
  publicServerKey = urlB64ToUint8Array('BBsb4au59pTKF4IKi-aJkEAGPXxtzs-lbtL58QxolsT2T-3dVQIXTUCCE1TSY8hyUvXLhJFEUmH7b5SJfSTcT-E');

  componentWillLoad() {
    this.swSupport = 'serviceWorker' in navigator && 'PushManager' in window;
  }

  @Listen('ionChange')
  subscribeToNotify($event: CustomEvent) {
    console.log($event.detail.checked);
    if ($event.detail.checked) {
      this.handleSub();
    }
  }

  handleSub() {
    // get our service worker registration
    navigator.serviceWorker.getRegistration().then((reg) => {

      // check if service worker is registered
      if (reg) {
        // get push subscription
        reg.pushManager.getSubscription().then((sub) => {

          // if there is no subscription that means
          // the user has not subscribed before
          if (sub === null) {
            // user is not subscribed
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.publicServerKey
            })
            .then((sub: PushSubscription) => {
              // our user is now subscribed
              // lets reflect this in our UI
              console.log('web push subscription: ', sub);
              this.notify = true;
            });
          }
        });
      }
    });
  }

  hostData() {
    return { class: 'ion-page' };
  }

  render() {
    // Here, we can use 'this.name' or 'this.match.params.name'.
    // theracode router passes your route params as props.
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>

          <ion-title>Stencil PWA Toolkit - {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,
      // <header>
      //   <h1>Stencil PWA Toolkit - {this.name}</h1>
      // </header>,

      <ion-content padding>
        <div class="app-profile">
          <p>
            Hello! My name is {this.name}.
            My name was passed in through a route param!
          </p>

          {/* htmlFor="notif-check" */}
          {this.swSupport ?
          <ion-item class="check-wrap">
            <ion-label>Notifications</ion-label>
            <ion-toggle id="notif-check" checked={this.notify} disabled={this.notify}></ion-toggle>
          </ion-item> : null}
        </div>
      </ion-content>
    ];
  }
}
