export interface IEmoji {
    name: string;
    unicode_version: number;
    category: string;
    order: number;
    display: number;
    shortname: string;
    shortname_alternates?: (string | null)[] | null;
    ascii?: (string | null)[] | null;
    humanform: number;
    diversity_base: number;
    diversity?: (string)[] | null;
    diversity_children?: (string | null)[] | null;
    gender?: (string | null)[] | null;
    gender_children?: (string | null)[] | null;
    code_points: CodePoints;
    keywords?: (string)[] | null;
}

export interface CodePoints {
    base: string;
    fully_qualified: string;
    decimal: string;
    diversity_parent?: string | null;
    gender_parent?: string | null;
}
