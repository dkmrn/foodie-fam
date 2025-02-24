export default function DummyPost({ title, isExpanded }) {
    return (
      <div
        style={{
          width: isExpanded ? 'min(70vw, 70vh)' : 'min(50vw, 50vh)', 
          height: isExpanded ? 'min(70vw, 70vh)' : 'min(50vw, 50vh)', 
          borderRadius: '16%',
          backgroundColor: 'white',
          border: '5px solid rgb(14, 7, 66)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          cursor: 'pointer', 
          transition: 'all 0.3s ease', 
        }}
      >
        {/* Inside the box */}
        <div
          style={{
            padding: '6%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: isExpanded ? 'column' : 'row', 
          }}
        >
          {/* Profile picture icon */}
          <img
            src="https://picsum.photos/id/237/200/300"
            alt="profile picture"
            style={{
              width: isExpanded ? '10vw' : '5vw', 
              height: isExpanded ? '10vw' : '5vw',
              borderRadius: '50%',
              objectFit: 'cover',
              marginRight: isExpanded ? '0' : '4%',
              marginBottom: isExpanded ? '1rem' : '0',
            }}
          />
        </div>
      </div>
    );
  }
  