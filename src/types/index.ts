export interface Produto {
    id_produto: number
    nome: string
    preco: number
    quantidade: number
    unidade: string
    imagem: string | null
    categoria: string
    id_cat: number
}

export interface ItemCarrinho extends Produto {
    quantidadeCarrinho: number
}

export interface Categoria {
    id_cat: number
    nome: string
    imagem: string
}

export interface Utilizador {
    id_user: string
    username: string
    email:string
    morada: string
    cidade: string
    cogigo_postal: string
    avatar_url: string

}
export interface Notificacao {
    id_not: number
    id_user: string
    titulo: string
    corpo: string
    lida: boolean
    created_at: EpochTimeStamp
}

export interface TopProduto {
    id_produto: number
    total_vendido: number
    produto: Produto

}
