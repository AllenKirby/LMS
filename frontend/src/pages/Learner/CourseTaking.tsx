import { QuestionCard } from "../../Components/Trainee Components"

const CourseTaking = () => {
  return (
     <section className="flex flex-row w-full h-full gap-10">
        <nav className="bg-blue-50 w-1/4 h-full"></nav>
        <div className="border-l w-3/4 h-full">
            <QuestionCard QT="TrueOrFalse" />        
        </div>
    </section>
  )
}

export default CourseTaking