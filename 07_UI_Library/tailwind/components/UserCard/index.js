import Link from "next/link";

const UserCard = (props) => {
  return (
    <Link href={`/user/${props.username}`} passHref>
        <div className="
            dark:bg-gray-800 bg-gray-100 cursor-pointer 
            dark:text-white p-4 rounded-md text-center shadow-xl"
        >
            <img 
                className="w-16 bg-gray-400 rounded-full m-auto"
                src={props.avatar} 
                alt={props.username}
            />
            <div className="mt-2 font-bold">
                {props.first_name} {props.last_name}
            </div>
            <div className="font-light">{props.job_title}</div>
        </div>
    </Link>
  )
}

export default UserCard