import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-trials-page',
  imports: [HeaderComponent, MatIconModule, MatButtonModule, RouterOutlet],
  templateUrl: './trials-page.component.html',
  styleUrl: './trials-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrialsPageComponent {}
