import UpdateForm from "@/app/_components/_user/updateUser-form";

export default function editUserPage(){
    return(
        <>
            <div>
                <h1>Edit User</h1>
                <p>This is where the user details are edited!</p>
                <UpdateForm username={""} email={""} password={""} image={""} />
            </div>
        </>
    )
}