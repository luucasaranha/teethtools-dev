import {Injectable} from '@angular/core';
import {getRemoteConfig, getValue, RemoteConfig} from "@angular/fire/remote-config";

@Injectable({
  providedIn: 'root'
})
export class SystemAccessConfigService {

  private remoteConfig: RemoteConfig = getRemoteConfig()


  constructor() { }

  async retrieveRemoteConfigData() {
    return getValue(this.remoteConfig, "access_to_system").asBoolean()
  }
}
