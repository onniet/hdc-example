import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button'

@Component({
    standalone: true,
    selector: 'bob-test',
    template: `
        Esto es un test 2

        <button>Click me</button>

        <button mat-raised-button color="primary">Click me</button>
        <button mat-raised-button color="warn">Click me</button>
    `,
    imports: [MatButton]
})
export class BobTestComponent  {
}
