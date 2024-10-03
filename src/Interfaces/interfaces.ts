export interface LoginRequestBody {
    username: string,
    password: string
}

export interface SignUpRequestBody {
    username : string,
    email : string,
    password: string
}

export interface CreateItem {
    title: string,
    url: string, 
    thumbnailUrl: string
}

export interface ItemCardProps {
    id: number,
   albumId: number,
   title: string,
   url : string,
   thumbnailUrl: string,
   added : boolean,
   callbackFn?: () => void 
}

export interface SearchBarProps {
    callBackFunction : (value: string) => void
}