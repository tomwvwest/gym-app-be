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
                <div  className={styles.bodySection}>
                <p>{convertToDateString(session.completed_at).time} | {convertToDateString(session.completed_at).date}</p>
                <p>Weight: {session.weight}</p>
                <p>Reps: {session.reps}</p>
                </div>
            </div>
        </div>
    )
}
