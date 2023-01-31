import {FormControl} from "@angular/forms";

export interface UserGeneralForm {
  firstName: FormControl<string|null>;
  lastName: FormControl<string|null>;
  email: FormControl<string|null>;
  roles: FormControl<string[]|null>;
  locked: FormControl<boolean|null>;
}
