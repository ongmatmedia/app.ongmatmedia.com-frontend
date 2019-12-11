import { User } from "./User";
import { Resolver, Query, Mutation, Arg, Int, Args } from "type-graphql"
import { ServicePricing } from "./ServicePricing";
import { PaymentHistory } from "../PaymentHistory/PaymentHistory";
import { UserEdge } from "./UserEdge";
import { UserConnection } from "./UserConnection";
import { SendmoneyResponse } from "./response.type";
import { PaymentMethod } from "./PaymentMethod";

@Resolver(of => User)
export class UserResolver {

  @Query(returns => User)
  me() { }

  @Query(returns => ServicePricing)
  pricing() {
  }

  @Query(returns => [PaymentMethod])
  payment_methods() {
  }

  @Query(returns => UserConnection)
  users(
    @Arg('limit', type => Int, { nullable: true }) limit: number,
    @Arg('after', { nullable: true }) after: string
  ) { }

  @Mutation(returns => UserEdge)
  create_user(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("email") email: string,
    @Arg("price_percent", type => Int) price_percent: number,
  ) { }

  @Mutation(returns => Boolean)
  update_price_percent(
    @Arg("user_id") id: string,
    @Arg("price_percent", type => Int) pricing: number,
  ) { }

  @Mutation(returns => Boolean)
  update_pricing(
    @Arg("price") price: ServicePricing,
  ) { }

  @Mutation(returns => SendmoneyResponse)
  send_money(
    @Arg("user_id") id: string,
    @Arg("amount", type => Int) amount: number,
    @Arg("note") note: string
  ) { }

  @Mutation(returns => Boolean)
  set_user_password(
    @Arg("user_id") id: string,
    @Arg("password") amount: string
  ) { }

  @Mutation(returns => Boolean)
  update_info(
    @Arg('facebook_uid') facebook_uid: string,
    @Arg('payment_methods', type => [PaymentMethod]) payment_methods: PaymentMethod[]
  ) { }

}