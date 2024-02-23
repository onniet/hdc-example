import { Component, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EventEmitter } from 'stream';

export interface TransferFormModel {
  memo: string | null;
  amount: number | null;
  receiverAddress: string | null;
}

export interface TransferFormPayload {
  memo: string;
  amount: number;
  receiverAddress: string;
}

@Component({
  selector: 'bob-transfer-form',
  template: `
    <form #form="ngForm" class="w-[400px]" (ngSubmit)="onSubmitForm(form)">
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Concepto</mat-label>
        <input
          name="memo"
          matInput
          type="text"
          placeholder="Ejemplo: Pagar el recibo de electricidad."
          [(ngModel)]="model.memo"
          required
          #memoControl="ngModel"
        />
        <mat-icon matSuffix>description</mat-icon>

        @if (form.submitted && memoControl.errors) {
          <mat-error>
            @if (memoControl.errors['required']) {
              El motivo es obligatorio.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser el motivo de la transferencia</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Cantidad</mat-label>
        <input
          name="amount"
          matInput
          type="number"
          min="0"
          placeholder="Ingresa aquí la cantidad."
          [(ngModel)]="model.amount"
          required
          #amountControl="ngModel"
        />
        <mat-icon matSuffix>attach_money</mat-icon>

        @if (form.submitted && amountControl.errors) {
          <mat-error>
            @if (amountControl.errors['required']) {
              La cantidad es obligatoria.
            } @else if (amountControl.errors['min']) {
              La cantidad debe ser mayor a cero.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser una cantidad mayor a 0</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Destinatario</mat-label>
        <input
          name="receiverAddress"
          matInput
          type="text"
          placeholder="Ingresa la públic key de la wallet del destinatario"
          [(ngModel)]="model.receiverAddress"
          required
          #receiverAddressControl="ngModel"
        />
        <mat-icon matSuffix>key</mat-icon>

        @if (form.submitted && receiverAddressControl.errors) {
          <mat-error>
            @if (receiverAddressControl.errors['required']) {
              La públic key del destinatario es obligatoria.
            }
          </mat-error>
        } @else {
          <mat-hint>Debe ser una wallet de Solana</mat-hint>
        }
      </mat-form-field>

      <footer>
        <button type="submit">Enviar</button>
      </footer>
    </form>
  `,
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
})
export class TransferFormComponent {
  readonly model: TransferFormModel = {
    memo: null,
    amount: null,
    receiverAddress: null,
  };

  @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      console.error('El formulario es inválido');
    }
  }
}
