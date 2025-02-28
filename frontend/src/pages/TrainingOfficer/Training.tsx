const Training = () => {
  return (
    <section className="h-full w-full px-7 py-5 text-f-dark">
        <header className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <h1 className="text-p-lg font-medium">Courses</h1>
                <button>Toggle</button>
            </div>
            <div className="flex gap-3">
                <select name="" id="">Category</select>
                <input type="text" placeholder="Search" />
                <select name="" id="">Embudo</select>
                <p>State</p>
                <button className="text-f-light p-3 rounded-md bg-c-green-50">I New Course</button>
            </div>
        </header>
        <main className="w-full flex-1 overflow-y-scroll grid grid-rows-3">
            
        </main>
    </section>
  )
}

export default Training