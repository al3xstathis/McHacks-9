import {useMutation, useQuery} from "react-query";
import API from "../api/api";


export const useIdeaGenerator = () => {
    return useQuery(["ideas"]), () => {
        API.post(`idea-generator/`).then(res => res)
        , {
            staleTime: Infinity,
        }
    }
}

export const useCodeAnalyzer = () => {
    return useQuery(["ideas"]), () => {
        API.post(`code-analyzer/`).then(res => res)
            , {
            staleTime: Infinity,
        }
    }
}
