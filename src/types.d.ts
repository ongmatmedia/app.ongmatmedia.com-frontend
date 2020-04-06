export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: any;
  AWSDateTime: any;
};


export type BuffViewersLivestream = {
  id: Scalars['ID'];
  user_id: Scalars['String'];
  status: Scalars['String'];
  amount: Scalars['Int'];
  limit_mins: Scalars['Int'];
  uid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  created_time: Scalars['Long'];
  end_time?: Maybe<Scalars['Long']>;
  first_reported_viewers?: Maybe<Scalars['Int']>;
  last_reported_viewers?: Maybe<Scalars['Int']>;
  logs?: Maybe<Array<BuffViewersLivestreamLog>>;
  orders: Array<BuffViewersLivestreamOrder>;
};

export type BuffViewersLivestreamAllUpdateEvent = {
  id: Scalars['ID'];
  last_reported_viewers?: Maybe<Scalars['Int']>;
};

export type BuffViewersLivestreamAllUpdateEventInput = {
  id: Scalars['ID'];
  last_reported_viewers?: Maybe<Scalars['Int']>;
};

export type BuffViewersLivestreamConnection = {
  edges: Array<BuffViewersLivestreamEdge>;
  pageInfo: PageInfo;
};

export type BuffViewersLivestreamEdge = {
  node: BuffViewersLivestream;
  cursor?: Maybe<Scalars['String']>;
};

export type BuffViewersLivestreamInput = {
  id: Scalars['String'];
  amount: Scalars['Int'];
  limit_mins: Scalars['Int'];
  uid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type BuffViewersLivestreamLog = {
  time: Scalars['Long'];
  amount: Scalars['Float'];
};

export type BuffViewersLivestreamLogInput = {
  time: Scalars['Long'];
  amount: Scalars['Float'];
};

export type BuffViewersLivestreamOrder = {
  from: Scalars['String'];
  time: Scalars['Long'];
  amount: Scalars['Int'];
  limit_mins: Scalars['Int'];
};

export type BuffViewersLivestreamStatus = {
  available_viewers: Scalars['Int'];
  total_viewers: Scalars['Int'];
};

export type BuffViewersLivestreamStatusInput = {
  available_viewers: Scalars['Int'];
  total_viewers: Scalars['Int'];
};

export type BuffViewersLivestreamTaskCudResponse = {
  buff: BuffViewersLivestreamEdge;
  me: User;
  payment_history?: Maybe<PaymentHistoryEdge>;
};

export type BuffViewersLivestreamUpdateEvent = {
  user_id: Scalars['String'];
  id: Scalars['ID'];
  status: Scalars['String'];
  end_time?: Maybe<Scalars['Long']>;
  first_reported_viewers?: Maybe<Scalars['Int']>;
  last_reported_viewers?: Maybe<Scalars['Int']>;
  logs?: Maybe<Array<BuffViewersLivestreamLog>>;
};

export type BuffViewersLivestreamUpdateEventInput = {
  user_id: Scalars['String'];
  id: Scalars['ID'];
  status: Scalars['String'];
  end_time?: Maybe<Scalars['Long']>;
  first_reported_viewers?: Maybe<Scalars['Int']>;
  last_reported_viewers?: Maybe<Scalars['Int']>;
  logs?: Maybe<Array<BuffViewersLivestreamLogInput>>;
};

export type FacebookAccount = {
  user_id: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  cookie?: Maybe<Scalars['String']>;
  touch_access_token?: Maybe<Scalars['String']>;
  livestream_access_token?: Maybe<Scalars['String']>;
  live: Scalars['Boolean'];
  created_at: Scalars['Long'];
  updated_at: Scalars['Long'];
};

export type FacebookAccountConnection = {
  edges: Array<FacebookAccountEdge>;
  pageInfo: PageInfo;
};

export type FacebookAccountEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: FacebookAccount;
};

export type FacebookAccountInfo = {
  name: Scalars['String'];
  id: Scalars['String'];
  type: Scalars['String'];
};

export type FacebookAccountInput = {
  cookie?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type FacebookAccountUpdateInput = {
  live?: Maybe<Scalars['Boolean']>;
};

export type Livestream = {
  user_id: Scalars['String'];
  id: Scalars['ID'];
  videos: Array<LivestreamVideo>;
  name: Scalars['String'];
  active: Scalars['Boolean'];
  status: Scalars['String'];
  created_time: Scalars['Long'];
  updated_time: Scalars['Long'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  times: Array<Scalars['Long']>;
  loop_times: Scalars['Int'];
  targets: LivestreamTarget;
  errors: Array<Scalars['String']>;
};

export type LivestreamConnection = {
  edges: Array<LivestreamEdge>;
  pageInfo: PageInfo;
};

export type LivestreamEdge = {
  node: Livestream;
  cursor?: Maybe<Scalars['String']>;
};

export type LivestreamFacebookTarget = {
  uid: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  owner: Scalars['String'];
};

export type LivestreamFacebookTargetInput = {
  uid: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  owner: Scalars['String'];
};

export type LivestreamInput = {
  videos: Array<LivestreamVideoInput>;
  name: Scalars['String'];
  times: Array<Scalars['Long']>;
  title: Scalars['String'];
  description: Scalars['String'];
  loop_times: Scalars['Int'];
  targets: LivestreamTargetInput;
};

export type LivestreamPricing = {
  p480: Scalars['Int'];
  p720: Scalars['Int'];
  p1080: Scalars['Int'];
};

export type LivestreamPricingInput = {
  p480: Scalars['Int'];
  p720: Scalars['Int'];
  p1080: Scalars['Int'];
};

export type LivestreamQueryFilters = {
  active: Scalars['Boolean'];
  created_time: Scalars['Long'];
};

export type LivestreamSubscription = {
  id: Scalars['ID'];
  user_id: Scalars['String'];
  quality: Scalars['Int'];
  concurrent_limit: Scalars['Int'];
  end_time: Scalars['Long'];
  playing: Scalars['Int'];
};

export type LivestreamSubscriptionInput = {
  quality: Scalars['Int'];
  concurrent_limit: Scalars['Int'];
};

export type LivestreamSubscriptionUpdateResponse = {
  livestream_subscription: LivestreamSubscription;
  me: User;
  payment_history?: Maybe<PaymentHistoryEdge>;
};

export type LivestreamTarget = {
  rtmps: Array<Scalars['String']>;
  facebooks: Array<LivestreamFacebookTarget>;
};

export type LivestreamTargetInput = {
  rtmps: Array<Scalars['String']>;
  facebooks: Array<LivestreamFacebookTargetInput>;
};

export type LivestreamUpdateInput = {
  user_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  videos?: Maybe<Array<LivestreamVideoInput>>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  times?: Maybe<Array<Scalars['Long']>>;
  loop_times?: Maybe<Scalars['Int']>;
  targets?: Maybe<LivestreamTargetInput>;
};

export type LivestreamVideo = {
  title: Scalars['String'];
  is_livestream: Scalars['Boolean'];
  video_id: Scalars['String'];
  thumbnail_url: Scalars['String'];
  url: Scalars['String'];
};

export type LivestreamVideoInput = {
  title: Scalars['String'];
  is_livestream: Scalars['Boolean'];
  video_id: Scalars['String'];
  thumbnail_url: Scalars['String'];
  url: Scalars['String'];
};


export type Mutation = {
  create_user: UserEdge;
  update_profile: UserEdge;
  update_price_for_user: User;
  send_money: SendmoneyResponse;
  set_user_password: Scalars['Boolean'];
  update_buff_viewers_livestream_playing: BuffViewersLivestreamConnection;
  create_buff_viewers_livestream_task: BuffViewersLivestreamTaskCudResponse;
  delete_buff_viewers_livestream_task: BuffViewersLivestreamTaskCudResponse;
  update_buff_viewers_livestream_task: BuffViewersLivestream;
  update_facebook_account: FacebookAccount;
  add_facebook_account: FacebookAccountEdge;
  delete_facebook_account: Scalars['Boolean'];
  update_livestream_subscription: LivestreamSubscriptionUpdateResponse;
  create_livestream: LivestreamEdge;
  update_livestream: Livestream;
  delete_livestream: Scalars['Boolean'];
  stop_livestream: Livestream;
  create_deposit: NewDepositInfo;
  create_notification: Notification;
  set_notification_read: Notification;
};


export type MutationCreate_UserArgs = {
  price_percent: Scalars['Int'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdate_ProfileArgs = {
  input: UserUpdateInput;
};


export type MutationUpdate_Price_For_UserArgs = {
  price: ServicePricingInput;
  price_percent: Scalars['Int'];
  user_id: Scalars['String'];
};


export type MutationSend_MoneyArgs = {
  note: Scalars['String'];
  amount: Scalars['Int'];
  user_id: Scalars['String'];
};


export type MutationSet_User_PasswordArgs = {
  password: Scalars['String'];
  user_id: Scalars['String'];
};


export type MutationUpdate_Buff_Viewers_Livestream_PlayingArgs = {
  tasks: Array<BuffViewersLivestreamAllUpdateEventInput>;
};


export type MutationCreate_Buff_Viewers_Livestream_TaskArgs = {
  input: BuffViewersLivestreamInput;
};


export type MutationDelete_Buff_Viewers_Livestream_TaskArgs = {
  id: Scalars['ID'];
};


export type MutationUpdate_Buff_Viewers_Livestream_TaskArgs = {
  input: BuffViewersLivestreamUpdateEventInput;
};


export type MutationUpdate_Facebook_AccountArgs = {
  input: FacebookAccountUpdateInput;
};


export type MutationAdd_Facebook_AccountArgs = {
  input: FacebookAccountInput;
};


export type MutationDelete_Facebook_AccountArgs = {
  id: Scalars['ID'];
};


export type MutationUpdate_Livestream_SubscriptionArgs = {
  days: Scalars['Int'];
  data: LivestreamSubscriptionInput;
  user_id?: Maybe<Scalars['ID']>;
};


export type MutationCreate_LivestreamArgs = {
  task: LivestreamInput;
};


export type MutationUpdate_LivestreamArgs = {
  task: LivestreamUpdateInput;
};


export type MutationDelete_LivestreamArgs = {
  id: Scalars['ID'];
};


export type MutationStop_LivestreamArgs = {
  id: Scalars['ID'];
};


export type MutationCreate_DepositArgs = {
  amount: Scalars['Int'];
};


export type MutationCreate_NotificationArgs = {
  input: NotificationInput;
};


export type MutationSet_Notification_ReadArgs = {
  id: Scalars['ID'];
};

export type NewDepositInfo = {
  id: Scalars['String'];
  time: Scalars['Long'];
  qrcode: Scalars['String'];
  qrdata: Scalars['String'];
};

export type Notification = {
  id: Scalars['ID'];
  user_id: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  time: Scalars['AWSDateTime'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  ref?: Maybe<Scalars['String']>;
};

export type NotificationConnection = {
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
};

export type NotificationEdge = {
  cursor: Scalars['String'];
  node: Notification;
};

export type NotificationInput = {
  user_id: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  ref?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentHistory = {
  id: Scalars['ID'];
  time: Scalars['Long'];
  total: Scalars['Int'];
  sender_username: Scalars['String'];
  sender_id: Scalars['String'];
  receiver_username?: Maybe<Scalars['String']>;
  service: Scalars['String'];
  receiver_id?: Maybe<Scalars['String']>;
  balance_after: Scalars['Long'];
  note: Scalars['String'];
};

export type PaymentHistoryConnection = {
  edges: Array<PaymentHistoryEdge>;
  pageInfo: PageInfo;
};

export type PaymentHistoryEdge = {
  node: PaymentHistory;
  cursor?: Maybe<Scalars['String']>;
};

export type PaymentMethod = {
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  account: Scalars['String'];
};

export type PaymentMethodInput = {
  name: Scalars['String'];
  owner: Scalars['String'];
  description: Scalars['String'];
  account: Scalars['String'];
};

export type Query = {
  me: User;
  myadmin: User;
  pricing: ServicePricing;
  payment_methods: Array<PaymentMethod>;
  users: UserConnection;
  buff_viewers_livestream_tasks: BuffViewersLivestreamConnection;
  buff_viewers_livestream_playing: BuffViewersLivestreamConnection;
  buff_viewers_livestream_task: BuffViewersLivestream;
  buff_viewers_system_status: BuffViewersLivestreamStatus;
  facebook_account_info: FacebookAccountInfo;
  facebook_accounts?: Maybe<FacebookAccountConnection>;
  facebook_account: FacebookAccount;
  livestream_subscription?: Maybe<LivestreamSubscription>;
  livestream_tasks: LivestreamConnection;
  livestream_task: Livestream;
  payment_histories: PaymentHistoryConnection;
  video_info: VideoInfo;
  notifications: Array<NotificationConnection>;
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBuff_Viewers_Livestream_TasksArgs = {
  before_time?: Maybe<Scalars['Long']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};


export type QueryBuff_Viewers_Livestream_TaskArgs = {
  id: Scalars['String'];
};


export type QueryFacebook_Account_InfoArgs = {
  url: Scalars['String'];
};


export type QueryFacebook_AccountsArgs = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryFacebook_AccountArgs = {
  id: Scalars['ID'];
};


export type QueryLivestream_SubscriptionArgs = {
  user_id?: Maybe<Scalars['ID']>;
};


export type QueryLivestream_TasksArgs = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  filters?: Maybe<LivestreamQueryFilters>;
};


export type QueryLivestream_TaskArgs = {
  id: Scalars['ID'];
};


export type QueryPayment_HistoriesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before_time?: Maybe<Scalars['Long']>;
};


export type QueryVideo_InfoArgs = {
  url: Scalars['String'];
};


export type QueryNotificationsArgs = {
  after?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SendmoneyResponse = {
  payment_history: PaymentHistoryEdge;
  me: User;
  user: UserEdge;
};

export type ServicePricing = {
  buff_viewers_livestream: Scalars['Int'];
  vip_viewers_livestream: Scalars['Int'];
  livestream: LivestreamPricing;
};

export type ServicePricingInput = {
  buff_viewers_livestream: Scalars['Int'];
  vip_viewers_livestream: Scalars['Int'];
  livestream: LivestreamPricingInput;
};

export type Subscription = {
  on_update_buff_viewers_livestream_playing?: Maybe<BuffViewersLivestreamConnection>;
  on_update_buff_viewers_livestream_task?: Maybe<BuffViewersLivestream>;
  on_update_livestream?: Maybe<Livestream>;
  on_new_notification?: Maybe<Notification>;
};


export type SubscriptionOn_Update_LivestreamArgs = {
  user_id: Scalars['String'];
};


export type SubscriptionOn_New_NotificationArgs = {
  user_id: Scalars['String'];
};

export type User = {
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  facebook_uid?: Maybe<Scalars['String']>;
  admin_page_uid?: Maybe<Scalars['String']>;
  admin_theme?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  balance: Scalars['Long'];
  default_pricing?: Maybe<ServicePricing>;
  pricing?: Maybe<ServicePricing>;
  default_price_percent?: Maybe<Scalars['Int']>;
  price_percent: Scalars['Int'];
  payment_methods?: Maybe<Array<PaymentMethod>>;
  creator_id: Scalars['String'];
  created_at: Scalars['Long'];
  updated_at: Scalars['Long'];
};

export type UserConnection = {
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: User;
};

export type UserUpdateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  facebook_uid?: Maybe<Scalars['String']>;
  admin_page_uid?: Maybe<Scalars['String']>;
  admin_theme?: Maybe<Scalars['String']>;
  payment_methods?: Maybe<Array<PaymentMethodInput>>;
};

export type VideoInfo = {
  title: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  video_id: Scalars['String'];
  livestreaming: Scalars['Boolean'];
  created_time: Scalars['String'];
  duration: Scalars['Int'];
  owner: VideoOwner;
  thumbnail: Scalars['String'];
};

export type VideoOwner = {
  name: Scalars['String'];
  id: Scalars['String'];
  avatar: Scalars['String'];
};
