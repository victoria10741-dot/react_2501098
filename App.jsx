import { useState } from 'react'

function App() {
  const [user, setUser] = useState([
    {id : 1, type : "개", breed : "말티즈", name : "흰둥이", gender : "남", status : "보호중", img : "https://buly.kr/6Bz2itz"},
    {id : 2, type : "고양이", breed : "코숏", name : "앙금이", gender : "여", status : "입양완료", img : "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100"},
    {id : 3, type : "기타", breed : "햄스터", name : "보리", gender : "남", status : "보호중", img : "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=100"}
  ]);

  const [inputs, setInputs] = useState({
    name: "",
    type: "개",
    breed: "",
    gender: "남",
    img: ""
  });

  const { name, type, breed, gender, img } = inputs;

  const[cnt, setCnt] = useState(4);

  //핸들 함수
  function handleAddChange(e){
    e.preventDefault();
    const { id, value } = e.target;
    
    setInputs({
      ...inputs,
      [id]: value
    });
  }

  // 입력 
  function handleUp(){
    if (name === "" || breed === "") {
      alert("품종과 이름을 모두 입력해주세요!");
      return;
    }

    const defaultImg = "https://via.placeholder.com/50?text=No+Image"; //기본 이미지
    
    //새로운 동물
    const newAnimal = {
      id: cnt,
      type: type,
      breed: breed,
      name: name,
      gender: gender,
      status: "보호중",
      img: img === "" ? defaultImg : img
    };

    setUser(prev => [newAnimal, ...prev]);

    setCnt(cnt + 1);
    
    setInputs({
      name: "",
      type: "개",
      breed: "",
      gender: "남",
      img: ""
    });
  }

  // 삭제
  function handleDelate(id){
    setUser(prev => prev.filter((item) => item.id !== id));
  }

  // 상태 변경
  function handleToggle(id) {
    setUser(prev =>
      prev.map((item) => {
        if(item.id === id) {
          return { ...item, status: item.status === "보호중" ? "입양완료" : "보호중" };
        }
        return item;
      })
    );
  }

  // UI 화면 렌더링 (화면 디자인은 생성형 AI(제미나이)를 이용했습니다!)
  return (
    <div style={{ padding: '20px', maxWidth: '550px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>유기동물 보호소 데이터 관리</h1>
      <hr />

      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>신규 동물 등록</h3>
        
        <label>종류: </label>
        <select id="type" value={type} onChange={handleAddChange} style={{ marginRight: '10px', padding: '5px' }}>
          <option value="개">개</option>
          <option value="고양이">고양이</option>
          <option value="기타">기타</option>
        </select>

        <label>성별: </label>
        <select id="gender" value={gender} onChange={handleAddChange} style={{ marginRight: '10px', padding: '5px' }}>
          <option value="남">남아</option>
          <option value="여">여아</option>
        </select>
        <br /><br />
        
        <input type="text" id="breed" placeholder="세부 품종" value={breed} onChange={handleAddChange} style={{ padding: '5px', marginRight: '5px', width: '130px' }} />
        <input type="text" id="name" placeholder="동물 이름" value={name} onChange={handleAddChange} style={{ padding: '5px', marginRight: '5px', width: '100px' }} />
        
        <input type="text" id="img" placeholder="이미지 주소 URL" value={img} onChange={handleAddChange} style={{ padding: '5px', marginRight: '5px', width: '150px', marginTop: '5px' }} />
        
        <button onClick={handleUp} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>등록하기</button>
      </div>

      <h3>현재 보호소 동물 목록</h3>
      {user.map(item => (
        <div key={item.id} style={{ border: '1px solid #ddd', padding: '12px', margin: '10px 0', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={item.img} 
              alt={item.name} 
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px', border: '1px solid #eee' }} 
            />

            <div>
              <strong>[{item.type} / {item.breed}] {item.name}</strong> ({item.gender === "남" ? "남아" : "여아"})
              <br />
              <span style={{ fontSize: '14px', color: '#555' }}>
                상태: <span style={{ fontWeight: 'bold', color: item.status === "보호중" ? "orange" : "green" }}>{item.status}</span>
              </span>
            </div>
          </div>

          <div>
            <button onClick={() => handleToggle(item.id)} style={{ marginRight: '5px', padding: '5px 8px', fontSize: '12px' }}>
              상태변경
            </button>
            <button onClick={() => handleDelate(item.id)} style={{ padding: '5px 8px', fontSize: '12px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}>
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;