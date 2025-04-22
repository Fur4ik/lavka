import { Route } from "@angular/router"
import { HomePageComponent } from "@lavka/home"
import { CartPageComponent } from "@lavka/cart"
import { CartEffects, cartFeature } from "@lavka/data-access"
import { provideState } from "@ngrx/store"
import { provideEffects } from "@ngrx/effects"
import {
  AssortmentFlowersComponent,
  FlowersPageComponent,
  HomeFlowersComponent,
  OrderFlowersComponent
} from "@lavka/product"

export const appRoutes: Route[] = [
  {
    path: "",
    component: HomePageComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  },
  {
    path: "cart",
    component: CartPageComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  },
  {
    path: "flowers",
    component: FlowersPageComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  },
  {
    path: "home-flowers",
    component: HomeFlowersComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  },
  {
    path: "order-flowers",
    component: OrderFlowersComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  },
  {
    path: "assortment-flowers",
    component: AssortmentFlowersComponent,
    providers: [provideState(cartFeature), provideEffects(CartEffects)],
  }
]
