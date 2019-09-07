import { observable } from 'mobx' 



export class BuffViewrsLivestreamWidgetStore{
    @observable visible : boolean= false
    @observable isLoading : boolean= false
    @observable errors : string | null = null

    show(){
        this.visible = true
        this.errors = null
    }

    loading(){
        this.isLoading = true
    }

    stop_loading(){
        this.isLoading = false
    }

    hide(){
        this.visible = false
    }

    show_errors(w: string){
        this.errors = w
    }
}

export const buff_viewers_livestream_widget_store = new BuffViewrsLivestreamWidgetStore()