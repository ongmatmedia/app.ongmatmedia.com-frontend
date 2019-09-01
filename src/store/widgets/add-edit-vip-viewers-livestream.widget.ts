import { observable } from 'mobx' 
import { VIPBuffViewersLivestreamTask } from '../../schema/Task/VIPBuffViewersLivestream';

export class VipViewrsLivestreamWidgetStore{
    @observable isVisible: boolean = false
    @observable isLoading: boolean = false
    @observable error: string | null = null
    @observable mode: 'add' | 'edit'
    @observable task: VIPBuffViewersLivestreamTask | null

    show_add(){
        this.task = null
        this.mode = 'add'
        this.isVisible = true
    }

    show_edit(task: VIPBuffViewersLivestreamTask){
        this.task = task
        this.mode = 'edit'
        this.isVisible = true
    }

    hide(){
        this.isVisible = false
        this.error = null
    }

    loading(){
        this.isLoading = true
    }

    stopLoading(){
        this.isLoading = false
    } 

    show_error(w: string | null){
        this.error = w
    }
}

export const vip_viewers_livestream_widget_store = new VipViewrsLivestreamWidgetStore()