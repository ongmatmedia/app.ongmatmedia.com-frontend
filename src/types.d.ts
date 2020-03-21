export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	Long: any
	AWSDateTime: any
}

export type BuffViewersLivestream = {
	id: Scalars['ID']
	user_id: Scalars['String']
	video_id: Scalars['String']
	uid: Scalars['String']
	status: Scalars['String']
	name: Scalars['String']
	note: Scalars['String']
	amount: Scalars['Int']
	created_time: Scalars['Long']
	end_time: Scalars['Long']
	limit_mins: Scalars['Int']
	logs: Array<BuffViewersLivestreamLog>
}

export type BuffViewersLivestreamConnection = {
	edges: Array<BuffViewersLivestreamEdge>
	pageInfo: PageInfo
}

export type BuffViewersLivestreamEdge = {
	node: BuffViewersLivestream
}

export type BuffViewersLivestreamInput = {
	id: Scalars['String']
	uid: Scalars['String']
	name: Scalars['String']
	note: Scalars['String']
	amount: Scalars['Int']
	limit_mins: Scalars['Int']
}

export type BuffViewersLivestreamLog = {
	time: Scalars['String']
	amount: Scalars['Float']
}

export type BuffViewersLivestreamLogEvent = {
	user_id: Scalars['String']
	video_id: Scalars['String']
	time: Scalars['Long']
	amount: Scalars['Int']
}

export type BuffViewersLivestreamLogEventInput = {
	user_id: Scalars['String']
	video_id: Scalars['String']
	time: Scalars['Long']
	amount: Scalars['Int']
}

export type BuffViewersLivestreamQueryFilters = {
	id: TableStringFilterInput
	amount: TableIntFilterInput
	created_time: TableIntFilterInput
}

export type BuffViewersLivestreamStatus = {
	available_viewers: Scalars['Int']
	total_viewers: Scalars['Int']
}

export type BuffViewersLivestreamStatusInput = {
	available_viewers: Scalars['Int']
	total_viewers: Scalars['Int']
}

export type BuffViewersLivestreamTaskCudResponse = {
	buff: BuffViewersLivestreamEdge
	me: User
	payment_history: Maybe<PaymentHistoryEdge>
}

export type BuffViewersLivestreamUpdateEvent = {
	user_id: Scalars['String']
	id: Scalars['ID']
	video_id: Scalars['String']
	status: Scalars['String']
	end_time: Maybe<Scalars['Long']>
}

export type BuffViewersLivestreamUpdateEventInput = {
	user_id: Scalars['String']
	id: Scalars['ID']
	video_id: Scalars['String']
	status: Scalars['String']
	end_time: Maybe<Scalars['Long']>
}

export type BuffViewersVideo = {
	video_id: Scalars['String']
	title: Scalars['String']
	uid: Scalars['Float']
	thumbnail: Scalars['String']
	note: Scalars['String']
	amount: Scalars['Float']
	done: Scalars['Float']
	created_time: Scalars['Float']
}

export type BuffViewersVideoConnection = {
	edges: Array<BuffViewersVideoEdge>
	pageInfo: PageInfo
}

export type BuffViewersVideoCudResponse = {
	buff: BuffViewersVideoEdge
	me: User
	payment_history: Maybe<PaymentHistoryEdge>
}

export type BuffViewersVideoEdge = {
	node: BuffViewersVideo
}

export type BuffViewersVideoInput = {
	video_id: Scalars['String']
	title: Scalars['String']
	uid: Scalars['Float']
	thumbnail: Scalars['String']
	note: Scalars['String']
	amount: Scalars['Float']
}

export type FacebookAccount = {
	user_id: Scalars['String']
	id: Scalars['ID']
	name: Scalars['String']
	cookie: Maybe<Scalars['String']>
	touch_access_token: Maybe<Scalars['String']>
	livestream_access_token: Maybe<Scalars['String']>
	live: Scalars['Boolean']
	created_at: Scalars['Long']
	updated_at: Scalars['Long']
}

export type FacebookAccountConnection = {
	edges: Array<FacebookAccountEdge>
	pageInfo: PageInfo
}

export type FacebookAccountEdge = {
	cursor: Maybe<Scalars['String']>
	node: FacebookAccount
}

export type FacebookAccountInfo = {
	name: Scalars['String']
	id: Scalars['String']
	type: Scalars['String']
}

export type FacebookAccountInput = {
	cookie: Maybe<Scalars['String']>
	username: Maybe<Scalars['String']>
	password: Maybe<Scalars['String']>
}

export type FacebookAccountUpdateInput = {
	live: Maybe<Scalars['Boolean']>
}

export type Livestream = {
	user_id: Scalars['String']
	id: Scalars['ID']
	videos: Array<LivestreamVideo>
	name: Scalars['String']
	active: Scalars['Boolean']
	status: Scalars['String']
	created_time: Scalars['Long']
	updated_time: Scalars['Long']
	title: Scalars['String']
	description: Maybe<Scalars['String']>
	times: Array<Scalars['Long']>
	loop_times: Scalars['Int']
	targets: LivestreamTarget
	errors: Array<Scalars['String']>
}

export type LivestreamConnection = {
	edges: Array<LivestreamEdge>
	pageInfo: PageInfo
}

export type LivestreamEdge = {
	node: Livestream
}

export type LivestreamFacebookTarget = {
	uid: Scalars['String']
	name: Scalars['String']
	type: Scalars['String']
	owner: Scalars['String']
}

export type LivestreamFacebookTargetInput = {
	uid: Scalars['String']
	name: Scalars['String']
	type: Scalars['String']
	owner: Scalars['String']
}

export type LivestreamInput = {
	videos: Array<LivestreamVideoInput>
	name: Scalars['String']
	times: Array<Scalars['Long']>
	title: Scalars['String']
	description: Scalars['String']
	loop_times: Scalars['Int']
	targets: LivestreamTargetInput
}

export type LivestreamPricing = {
	p480: Scalars['Int']
	p720: Scalars['Int']
	p1080: Scalars['Int']
}

export type LivestreamPricingInput = {
	p480: Scalars['Int']
	p720: Scalars['Int']
	p1080: Scalars['Int']
}

export type LivestreamQueryFilters = {
	active: Scalars['Boolean']
	created_time: Scalars['Long']
}

export type LivestreamSubscription = {
	id: Scalars['ID']
	user_id: Scalars['String']
	quality: Scalars['Int']
	concurrent_limit: Scalars['Int']
	end_time: Scalars['Long']
	playing: Scalars['Int']
}

export type LivestreamSubscriptionInput = {
	quality: Scalars['Int']
	concurrent_limit: Scalars['Int']
}

export type LivestreamSubscriptionUpdateResponse = {
	livestream_subscription: LivestreamSubscription
	me: User
	payment_history: Maybe<PaymentHistoryEdge>
}

export type LivestreamTarget = {
	rtmps: Array<Scalars['String']>
	facebooks: Array<LivestreamFacebookTarget>
}

export type LivestreamTargetInput = {
	rtmps: Array<Scalars['String']>
	facebooks: Array<LivestreamFacebookTargetInput>
}

export type LivestreamUpdateInput = {
	user_id: Maybe<Scalars['String']>
	id: Scalars['ID']
	videos: Maybe<Array<LivestreamVideoInput>>
	name: Maybe<Scalars['String']>
	status: Maybe<Scalars['String']>
	active: Maybe<Scalars['Boolean']>
	title: Maybe<Scalars['String']>
	description: Maybe<Scalars['String']>
	times: Maybe<Array<Scalars['Long']>>
	loop_times: Maybe<Scalars['Int']>
	targets: Maybe<LivestreamTargetInput>
}

export type LivestreamVideo = {
	title: Scalars['String']
	is_livestream: Scalars['Boolean']
	video_id: Scalars['String']
	thumbnail_url: Scalars['String']
	url: Scalars['String']
}

export type LivestreamVideoInput = {
	title: Scalars['String']
	is_livestream: Scalars['Boolean']
	video_id: Scalars['String']
	thumbnail_url: Scalars['String']
	url: Scalars['String']
}

export type Mutation = {
	create_user: UserEdge
	update_price_for_user: UserEdge
	send_money: SendmoneyResponse
	set_user_password: Scalars['Boolean']
	update_info: Scalars['Boolean']
	create_buff_viewers_livestream_task: BuffViewersLivestreamTaskCudResponse
	delete_buff_viewers_livestream_task: BuffViewersLivestreamTaskCudResponse
	update_buff_viewers_livestream: BuffViewersLivestreamUpdateEvent
	log_buff_viewers_livestream_viewers: BuffViewersLivestreamLogEvent
	update_facebook_account: FacebookAccount
	add_facebook_account: FacebookAccountEdge
	delete_facebook_account: Scalars['Boolean']
	create_vip_viewers_livestream_task: VipViewersLivestreamTaskCudResponse
	update_vip_viewers_livestream_task: VipViewersLivestreamTaskCudResponse
	delete_vip_viewers_livestream_task: VipViewersLivestreamTaskCudResponse
	update_livestream_subscription: LivestreamSubscriptionUpdateResponse
	create_livestream: LivestreamEdge
	update_livestream: Livestream
	delete_livestream: Scalars['Boolean']
	stop_livestream: Livestream
	create_deposit: NewDepositInfo
	create_buff_viewers_video_task: BuffViewersVideoCudResponse
	delete_buff_viewers_video_task: BuffViewersVideoCudResponse
	create_notification: Notification
	set_notification_read: Notification
}

export type MutationCreate_UserArgs = {
	price_percent: Scalars['Int']
	email: Scalars['String']
	password: Scalars['String']
	username: Scalars['String']
}

export type MutationUpdate_Price_For_UserArgs = {
	price: ServicePricingInput
	price_percent: Scalars['Int']
	user_id: Scalars['String']
}

export type MutationSend_MoneyArgs = {
	note: Scalars['String']
	amount: Scalars['Int']
	user_id: Scalars['String']
}

export type MutationSet_User_PasswordArgs = {
	password: Scalars['String']
	user_id: Scalars['String']
}

export type MutationUpdate_InfoArgs = {
	payment_methods: Array<PaymentMethodInput>
	facebook_uid: Scalars['String']
}

export type MutationCreate_Buff_Viewers_Livestream_TaskArgs = {
	input: BuffViewersLivestreamInput
}

export type MutationDelete_Buff_Viewers_Livestream_TaskArgs = {
	id: Scalars['ID']
}

export type MutationUpdate_Buff_Viewers_LivestreamArgs = {
	event: BuffViewersLivestreamUpdateEventInput
}

export type MutationLog_Buff_Viewers_Livestream_ViewersArgs = {
	event: BuffViewersLivestreamLogEventInput
}

export type MutationUpdate_Facebook_AccountArgs = {
	input: FacebookAccountUpdateInput
}

export type MutationAdd_Facebook_AccountArgs = {
	input: FacebookAccountInput
}

export type MutationDelete_Facebook_AccountArgs = {
	id: Scalars['ID']
}

export type MutationCreate_Vip_Viewers_Livestream_TaskArgs = {
	input: VipViewersLivestreamInput
}

export type MutationUpdate_Vip_Viewers_Livestream_TaskArgs = {
	input: VipViewersLivestreamUpdateInput
}

export type MutationDelete_Vip_Viewers_Livestream_TaskArgs = {
	id: Scalars['String']
}

export type MutationUpdate_Livestream_SubscriptionArgs = {
	days: Scalars['Int']
	data: LivestreamSubscriptionInput
	user_id: Maybe<Scalars['ID']>
}

export type MutationCreate_LivestreamArgs = {
	task: LivestreamInput
}

export type MutationUpdate_LivestreamArgs = {
	task: LivestreamUpdateInput
}

export type MutationDelete_LivestreamArgs = {
	id: Scalars['ID']
}

export type MutationStop_LivestreamArgs = {
	id: Scalars['ID']
}

export type MutationCreate_DepositArgs = {
	amount: Scalars['Int']
}

export type MutationCreate_Buff_Viewers_Video_TaskArgs = {
	input: BuffViewersVideoInput
}

export type MutationDelete_Buff_Viewers_Video_TaskArgs = {
	id: Scalars['ID']
}

export type MutationCreate_NotificationArgs = {
	input: NotificationInput
}

export type MutationSet_Notification_ReadArgs = {
	id: Scalars['ID']
}

export type NewDepositInfo = {
	id: Scalars['String']
	time: Scalars['Long']
	qrcode: Scalars['String']
	qrdata: Scalars['String']
}

export type Notification = {
	id: Scalars['ID']
	user_id: Scalars['String']
	icon: Maybe<Scalars['String']>
	time: Scalars['AWSDateTime']
	title: Scalars['String']
	body: Maybe<Scalars['String']>
	ref: Maybe<Scalars['String']>
}

export type NotificationConnection = {
	edges: Array<NotificationEdge>
	pageInfo: PageInfo
}

export type NotificationEdge = {
	cursor: Scalars['String']
	node: Notification
}

export type NotificationInput = {
	user_id: Scalars['String']
	icon: Maybe<Scalars['String']>
	title: Scalars['String']
	body: Maybe<Scalars['String']>
	ref: Maybe<Scalars['String']>
}

export type PageInfo = {
	next_token: Maybe<Scalars['String']>
	prev_token: Maybe<Scalars['String']>
}

export type PaymentHistory = {
	id: Scalars['ID']
	time: Scalars['Long']
	total: Scalars['Int']
	sender_username: Scalars['String']
	sender_id: Scalars['String']
	receiver_username: Maybe<Scalars['String']>
	service: Scalars['String']
	receiver_id: Maybe<Scalars['String']>
	balance_after: Scalars['Long']
	note: Scalars['String']
}

export type PaymentHistoryConnection = {
	edges: Array<PaymentHistoryEdge>
	pageInfo: PageInfo
}

export type PaymentHistoryEdge = {
	node: PaymentHistory
}

export type PaymentMethod = {
	name: Scalars['String']
	owner: Scalars['String']
	description: Scalars['String']
	account: Scalars['String']
	image_url: Scalars['String']
	url: Maybe<Scalars['String']>
	qrcode: Maybe<Scalars['String']>
}

export type PaymentMethodInput = {
	name: Scalars['String']
	owner: Scalars['String']
	description: Scalars['String']
	account: Scalars['String']
	image_url: Scalars['String']
	url: Maybe<Scalars['String']>
	qrcode: Maybe<Scalars['String']>
}

export type Query = {
	me: User
	pricing: ServicePricing
	payment_methods: Array<PaymentMethod>
	users: UserConnection
	buff_viewers_livestream_tasks: BuffViewersLivestreamConnection
	buff_viewers_system_status: BuffViewersLivestreamStatus
	facebook_account_info: FacebookAccountInfo
	facebook_accounts: Maybe<FacebookAccountConnection>
	facebook_account: FacebookAccount
	vip_viewers_livestream_tasks: VipViewersLivestreamConnection
	vip_viewers_livestream_task: VipViewersLivestream
	livestream_subscription: Maybe<LivestreamSubscription>
	livestream_tasks: LivestreamConnection
	livestream_task: Livestream
	payment_histories: PaymentHistoryConnection
	buff_viewers_video_tasks: BuffViewersVideoConnection
	video_info: VideoInfo
	notifications: Array<NotificationConnection>
}

export type QueryUsersArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
}

export type QueryBuff_Viewers_Livestream_TasksArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
	filters: Maybe<BuffViewersLivestreamQueryFilters>
}

export type QueryFacebook_Account_InfoArgs = {
	url: Scalars['String']
}

export type QueryFacebook_AccountsArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
}

export type QueryFacebook_AccountArgs = {
	id: Scalars['ID']
}

export type QueryVip_Viewers_Livestream_TasksArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
	filters: Maybe<VipViewersLivestreamQueryFilters>
}

export type QueryVip_Viewers_Livestream_TaskArgs = {
	id: Scalars['String']
}

export type QueryLivestream_SubscriptionArgs = {
	user_id: Maybe<Scalars['ID']>
}

export type QueryLivestream_TasksArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
	filters: Maybe<LivestreamQueryFilters>
}

export type QueryLivestream_TaskArgs = {
	id: Scalars['ID']
}

export type QueryPayment_HistoriesArgs = {
	after: Maybe<Scalars['String']>
	before_time: Maybe<Scalars['Long']>
}

export type QueryBuff_Viewers_Video_TasksArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
}

export type QueryVideo_InfoArgs = {
	url: Scalars['String']
}

export type QueryNotificationsArgs = {
	after: Maybe<Scalars['String']>
	limit: Maybe<Scalars['Int']>
}

export type SendmoneyResponse = {
	payment_history: PaymentHistoryEdge
	me: User
	user: UserEdge
}

export type ServicePricing = {
	buff_viewers_livestream: Scalars['Int']
	vip_viewers_livestream: Scalars['Int']
	livestream: LivestreamPricing
}

export type ServicePricingInput = {
	buff_viewers_livestream: Scalars['Int']
	vip_viewers_livestream: Scalars['Int']
	livestream: LivestreamPricingInput
}

export type Subscription = {
	on_buff_viewers_livestream_update: Maybe<BuffViewersLivestreamUpdateEvent>
	on_buff_viewers_livestream_viewers_update: Maybe<
		BuffViewersLivestreamLogEvent
	>
	on_update_livestream: Maybe<Livestream>
	on_new_notification: Maybe<Notification>
}

export type SubscriptionOn_Buff_Viewers_Livestream_UpdateArgs = {
	user_id: Maybe<Scalars['String']>
}

export type SubscriptionOn_Buff_Viewers_Livestream_Viewers_UpdateArgs = {
	user_id: Scalars['String']
}

export type SubscriptionOn_Update_LivestreamArgs = {
	user_id: Scalars['String']
}

export type SubscriptionOn_New_NotificationArgs = {
	user_id: Scalars['String']
}

export type TableBooleanFilterInput = {
	ne: Maybe<Scalars['Boolean']>
	eq: Maybe<Scalars['Boolean']>
}

export type TableIntFilterInput = {
	ne: Maybe<Scalars['Int']>
	eq: Maybe<Scalars['Int']>
	le: Maybe<Scalars['Int']>
	lt: Maybe<Scalars['Int']>
	ge: Maybe<Scalars['Int']>
	gt: Maybe<Scalars['Int']>
	between: Maybe<Scalars['Int']>
}

export type TableStringFilterInput = {
	ne: Maybe<Scalars['String']>
	eq: Maybe<Scalars['String']>
	le: Maybe<Scalars['String']>
	lt: Maybe<Scalars['String']>
	ge: Maybe<Scalars['String']>
	gt: Maybe<Scalars['String']>
	between: Maybe<Scalars['String']>
}

export type User = {
	username: Scalars['String']
	email: Scalars['String']
	facebook_uid: Scalars['String']
	id: Scalars['ID']
	balance: Scalars['Long']
	pricing: Maybe<ServicePricing>
	price_percent: Scalars['Int']
	payment_methods: Maybe<Array<PaymentMethod>>
	creator_id: Scalars['String']
	created_at: Scalars['Long']
	updated_at: Scalars['Long']
}

export type UserConnection = {
	edges: Array<UserEdge>
	pageInfo: PageInfo
}

export type UserEdge = {
	cursor: Scalars['String']
	node: User
}

export type VideoInfo = {
	title: Scalars['String']
	description: Scalars['String']
	id: Scalars['String']
	livestreaming: Scalars['Boolean']
	created_time: Scalars['String']
	duration: Scalars['Int']
	owner: VideoOwner
	thumbnail: Scalars['String']
}

export type VideoOwner = {
	name: Scalars['String']
	id: Scalars['String']
	avatar: Scalars['String']
}

export type VipViewersLivestream = {
	user_id: Scalars['String']
	id: Scalars['ID']
	active: Scalars['Boolean']
	amount: Scalars['Int']
	bought_mins: Scalars['Int']
	used_mins: Scalars['Int']
	note: Scalars['String']
	name: Scalars['String']
	histories: Array<VipViewersLivestreamHistory>
	created_time: Scalars['Long']
	updated_time: Scalars['Long']
	auto_disable_after: Scalars['Float']
	parallel: Scalars['Float']
}

export type VipViewersLivestreamConnection = {
	edges: Array<VipViewersLivestreamEdge>
	pageInfo: PageInfo
}

export type VipViewersLivestreamEdge = {
	node: VipViewersLivestream
}

export type VipViewersLivestreamHistory = {
	id: Scalars['String']
	created_time: Scalars['Float']
	viewers_count: Array<Scalars['Int']>
	thumbnail: Scalars['String']
}

export type VipViewersLivestreamInput = {
	id: Scalars['String']
	active: Scalars['Boolean']
	note: Scalars['String']
	amount: Scalars['Int']
	name: Scalars['String']
	auto_disable_after: Scalars['Int']
	parallel: Scalars['Int']
	bought_mins: Scalars['Int']
}

export type VipViewersLivestreamQueryFilters = {
	amount: TableIntFilterInput
	created_time: TableIntFilterInput
	end_time: TableIntFilterInput
}

export type VipViewersLivestreamTaskCudResponse = {
	vip: VipViewersLivestreamEdge
	me: User
	payment_history: Maybe<PaymentHistoryEdge>
}

export type VipViewersLivestreamUpdateInput = {
	id: Scalars['String']
	active: Maybe<Scalars['Boolean']>
	note: Maybe<Scalars['String']>
	amount: Maybe<Scalars['Int']>
	name: Maybe<Scalars['String']>
	auto_disable_after: Maybe<Scalars['Int']>
	parallel: Maybe<Scalars['Int']>
	bought_mins: Maybe<Scalars['Int']>
}
