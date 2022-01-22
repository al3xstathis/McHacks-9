import {useMutation} from "react-query";
import API from "../api/api";


export const useIdeaGenerator = () => {
    return useMutation(["ideas"]), (data) => {
        API.post(`/idea-generator/`, data).then(res => res)
            , {
            staleTime: Infinity,
        }
    }
}

export const useCodeAnalyzer = () => {
    return useMutation(["code"]), (data) => {
        API.post(`/code-analyzer/`, data).then(res => res)
            , {
            staleTime: Infinity,
        }
    }
}

export const useStackGenerator = () => {
    return useMutation(["stack"]), (data) => {
        API.post(`/stack/`, data).then(res => res)
            , {
            staleTime: Infinity
        }
    }
}
