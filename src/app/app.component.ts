import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HdWalletMultiButtonComponent],
  selector: 'bob-root',
  template: `
    <header class="pb-4 pt-16 relative">
      <h1 class="text-5xl text-center mb-4">Hola, soy Bob.</h1>

      <div class="flex justify-center absolute top-4 right-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (balance()) {
        <div
          class="flex justify-center items-center gap-2 absolute top-4 left-4"
        >
          <img src="assets/solana-logo.png" class="w-8 h-8" />
          <p class="font-bold">{{ balance()?.balance }}</p>
        </div>
      }
    </header>

    <button (click)="onTransfer()">Transferir!!!</button>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  private readonly _matDialog = inject(MatDialog);

  readonly balance = computedAsync(() =>
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
  );

  onTransfer() {
    this._matDialog.open(TransferModalComponent);
  }
}
