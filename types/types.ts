import Stripe from 'stripe';
import exp from "node:constants";

export interface UserDetail {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    bulling_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Price {
    id: string;
    product_id?: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
}

export interface Subscription {
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: string;
    cancel_at_period_end?: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    price?: Price;
}