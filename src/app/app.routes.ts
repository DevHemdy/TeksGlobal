import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { AboutComponent } from './pages/about/about/about.component';
import { ContactComponent } from './pages/contact/contact/contact.component';
import { ServicesComponent } from './pages/services/services/services.component';
import { ShopComponent } from './pages/shop/shop/shop.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CartComponent } from './components/product/cart/cart.component';
import { CabinFinderComponent } from './pages/cabin-finder/cabin-finder.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';
import { CustomerInfoComponent } from './pages/checkout/customer-info/customer-info.component';
import { DeliveryOptionsComponent } from './pages/checkout/delivery-options/delivery-options.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';
import { ReviewComponent } from './pages/checkout/review/review.component';
import { ConfirmationComponent } from './pages/checkout/confirmation/confirmation.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'cabin-finder', component: CabinFinderComponent},
    {path: 'comparison', component: ComparisonComponent},
    {path: 'product/:id', component: ProductDetailComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout/customer-info', component: CustomerInfoComponent},
    {path: 'checkout/delivery-options', component: DeliveryOptionsComponent},
    {path: 'checkout/payment', component: PaymentComponent},
    {path: 'checkout/review', component: ReviewComponent},
    {path: 'checkout/confirmation', component: ConfirmationComponent},
];
