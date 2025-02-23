export default function DummyPost() {
return (
    <div style={{ 
        width: 'min(50vw, 50vh)', 
        height: 'min(50vw, 50vh)', 
        borderRadius: '16%', 
        backgroundColor: "white",
        border: '5px solid rgb(14, 7, 66)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }}>
        {/*inside the box*/}
        <div style={{
            padding: '6%',
            width: '100%',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/*profile picture icon*/}
            <img 
                src="https://picsum.photos/id/237/200/300"
                alt="profile picture"
                style={{
                    width: 'min(5vw,5vh)',
                    height: 'min(5vw,5vh',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '4%'
                }}
            />
            <span style={{ fontSize: 'min(3vw, 3vh)' }}>
                joycejeoung
            </span>
        </div>
    </div>
  );
}