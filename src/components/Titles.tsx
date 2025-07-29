interface TitlesProps {
    title: string
    subTitle?: string
    description?: string
}


const Titles = ({ title, subTitle, description }: TitlesProps ) => {
  return (
    <>
        <h1 className="py-3 text-xl font-semibold">{title}</h1>
        { subTitle && (
            <div className="text-muted-foreground ">
                <p>{subTitle}</p>
                <p>{description}</p>
            </div>
        ) }
    </>
  )
}

export default Titles