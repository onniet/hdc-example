import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'bob-balance-section',
  imports: [MatTableModule, MatCard],
  standalone: true,
  template: `
    <mat-card class="w-[500px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Balance</h2>

      @if (!account()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div class="flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-8 h-8" />
          <p class="text-xl">{{ account()?.balance }}</p>
        </div>
      }
    </mat-card>
  `,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );
}
