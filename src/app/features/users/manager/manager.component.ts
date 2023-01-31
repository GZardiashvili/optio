import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../entity/user";
import {CommonService} from "../../../common/common.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {
  readonly placeholder: string = 'Search users';
  value!: User ;
  constructor(private commonService: CommonService) {
  }
  findUser(id: string) {
    this.commonService.sendSearchTerm(id)
  }
}

