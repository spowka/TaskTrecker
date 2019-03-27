import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft, faSpinner, faAtom, faKey, faPlus, faMarker, faTrash, faAngleDown, faUserCircle, faSignOutAlt, faSearch, faEllipsisV,
  faEnvelope, faPhone, faTimes, faSave, faDownload, faTicketAlt, faEye, faPaperPlane, faTimesCircle, faCheckCircle, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleLeft, faSpinner, faAtom, faKey, faPlus, faMarker, faTrash, faAngleDown, faUserCircle, faSignOutAlt, faSearch, faEllipsisV,
  faEnvelope, faPhone, faTimes, faSave, faDownload, faTicketAlt, faEye, faPaperPlane, faTimesCircle, faCheckCircle, faTrashAlt
);

@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontModule { }
