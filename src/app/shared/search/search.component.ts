import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {CommonService} from "../../common/common.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchControl: FormControl = new FormControl('');
  @Input() placeholder: string = 'Search...';

  constructor(private commonService: CommonService) {
    this.searchControl.valueChanges.subscribe(term => {
      this.commonService.sendSearchTerm(term)
    });
  }


  ngOnInit(): void {
  }

  clear() {
    this.searchControl.setValue('');
    this.commonService.sendSearchTerm('');
  }
}
