import { Plus } from "lucide-react"
import { CustomDialog, CDialogTrigger, CDialogContent } from "@/components/ui/customDialog"
import { useActionContext } from "@/hooks/useActionContext"

import { Form } from "../Form"
import Confirmation from "@/components/Confirmation"
import { useDeleteData } from "@/hooks/tanStack/useDeleteData"

const ProductPrimaryButtons = () => {
    const { actions, setActions } = useActionContext();
    const { mutate, isPending } = useDeleteData(["products", "products-status"], "/admin/product", {
        onSettled: () => { setActions(undefined); }
    })
    const condition = actions?.action == "edit" && actions.id && actions.slug;
    const onDelete = () => {
        if (actions?.id) {
            mutate({
                id: actions.id
            });
        }
    }

    return (
        <>
            <Confirmation state={{
                open: actions?.action == "delete" && !!actions.id,
                setOpen: () => setActions(undefined)
            }}
                isPending={isPending}
                title="Delete Product"
                message="Are you sure you want to delete this product?"
                action={onDelete}
            />

            <CustomDialog open={!!condition} >
                <CDialogTrigger className="bg-accent-foreground text-accent hover:bg-accent-foreground/80 hover:text-accent">
                    <Plus size={18} /> Create
                </CDialogTrigger>
                <CDialogContent className="bg-primary-foreground rounded-lg max-w-5xl relative">
                    <div className="text-base font-medium absolute top-4 left-4 ">Create Product</div>
                    <Form />
                </CDialogContent>
            </CustomDialog>

        </>
    )
}

export default ProductPrimaryButtons
