import { Component } from '@angular/core';
import { TransferFormComponent } from './transfer-form.component';

@Component({
  selector: 'bob-transfer-modal',
  template: `
    <div class="pb1">
      <h2 class="">Transferir Fondos</h2>

      <bob-transfer-form></bob-transfer-form>
    </div>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {}
