import { Component } from '@angular/core';
import {
  TransferFormComponent,
  TransferFormPayload,
} from './transfer-form.component';

@Component({
  selector: 'bob-transfer-modal',
  template: `
    <div class="pb1">
      <h2 class="text-3xl text-center mb-4">Transferir Fondos</h2>

      <bob-transfer-form (submitForm)="onTransfer($event)"></bob-transfer-form>
    </div>
  `,
  standalone: true,
  imports: [TransferFormComponent],
})
export class TransferModalComponent {
  onTransfer(payload: TransferFormPayload) {
    console.log('Hola mundo!', payload);
  }
}
