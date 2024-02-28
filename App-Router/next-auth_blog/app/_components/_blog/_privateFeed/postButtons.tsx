import { deletePost, editPostNav } from "@/app/_actions/postFormActions";
import { TrashIcon, DocumentPlusIcon } from "@heroicons/react/24/solid";

export async function DeletePost({pid}:{pid: string}) {
    
    const DeletePost = deletePost.bind( null, pid);

    return(
        <form action={DeletePost}>
            <button className="rounded-sm border p1 hover:border-blue-300">
                <span className="sr-only">Trash</span>
                <TrashIcon className="w-5"/>
            </button>
        </form>
    )

}

export async function EditPost({pid}:{pid: string}) {
    
    const EditPostNav = editPostNav.bind(null, pid); 

    return(
        <form action={EditPostNav}>
            <button className="rounded-sm border p1 hover:border-blue-300">
                <span className="sr-only">Edit</span>
                <DocumentPlusIcon className="w-5"/>
            </button>
        </form>
    )

}
