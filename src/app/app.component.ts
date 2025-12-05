import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/reusables/header/header/header.component";
import { FooterComponent } from "./components/reusables/footer/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']   
})
export class AppComponent {
  title = 'Teks Global Resources';
}
