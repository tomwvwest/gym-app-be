import styles from "@/app/style";

export default function SessionCard ({ session }) {

    function convertToDateString(str){
        const date = str.slice(8,10) + '/' + str.slice(5,7) + '/' + str.slice(0,4)
        const time = str.slice(11,16)
        
        return {time, date}
      }

    return (
        <div className={`${styles.card}`}>
            <div key={session.logged_id}>
                <div className="flex gap-5 text-sm md:text-lg lg:text-lg">
                    <p className="w-[35%]">{convertToDateString(session.completed_at).date}</p>
                    <p className="w-[35%]"><span className="font-bold">Weight: </span>{session.weight}</p>
                    <p className="w-[30%]"><span className="font-bold">Reps: </span>{session.reps}</p>
                </div>
            </div>
        </div>
    )
}
