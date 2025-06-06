import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useBlocker } from '@uniqueeest/hooks';
import './App.css';

// 간단한 커스텀 모달 컴포넌트
function CustomModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>⚠️ 확인 필요</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-btn">
            취소
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [useCustomModal, setUseCustomModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResolve, setModalResolve] = useState<
    ((value: boolean) => void) | null
  >(null);
  const navigate = useNavigate();

  // 커스텀 모달을 보여주는 함수
  const showCustomModal = (): Promise<boolean> => {
    console.log('🎭 커스텀 모달 함수 호출됨');
    return new Promise((resolve) => {
      setModalResolve(() => resolve);
      setModalOpen(true);
      console.log('🎭 모달 상태 업데이트 완료');
    });
  };

  const handleModalConfirm = () => {
    console.log('✅ 커스텀 모달 확인 클릭');
    setModalOpen(false);
    modalResolve?.(true);
    setModalResolve(null);
  };

  const handleModalCancel = () => {
    console.log('❌ 커스텀 모달 취소 클릭');
    setModalOpen(false);
    modalResolve?.(false);
    setModalResolve(null);
  };

  // 우리가 만든 useBlocker 훅 사용
  useBlocker({
    when: hasUnsavedChanges,
    message: '저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?',
    onBlock: useCustomModal
      ? async () => {
          return await showCustomModal();
        }
      : undefined,
    onBlocked: () => {
      console.log('페이지 이탈이 차단되었습니다.');
    },
    onUnblocked: () => {
      console.log('페이지 이탈이 허용되었습니다.');
      setHasUnsavedChanges(false);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // 저장 로직 (실제로는 API 호출 등)
    console.log('저장되었습니다:', inputValue);
    setHasUnsavedChanges(false);
    alert('저장되었습니다!');
  };

  const handleReset = () => {
    setInputValue('');
    setHasUnsavedChanges(false);
  };

  const handleProgrammaticNavigation = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm(
        '저장하지 않은 변경사항이 있습니다. 정말 이동하시겠습니까?',
      );
      if (confirm) {
        setHasUnsavedChanges(false);
        navigate('/about');
      }
    } else {
      navigate('/about');
    }
  };

  return (
    <div className="page">
      <h1>홈 페이지</h1>
      <p>React Router DOM에 종속되지 않는 useBlocker 훅 테스트</p>

      <div className="modal-toggle-section">
        <h2>모달 유형 선택</h2>
        <div className="toggle-buttons">
          <button
            onClick={() => setUseCustomModal(false)}
            className={!useCustomModal ? 'active' : ''}
          >
            🔔 브라우저 기본 confirm
          </button>
          <button
            onClick={() => setUseCustomModal(true)}
            className={useCustomModal ? 'active' : ''}
          >
            🎨 커스텀 모달
          </button>
        </div>
        <p className="toggle-info">
          현재 사용 중:{' '}
          <strong>
            {useCustomModal ? '커스텀 모달' : '브라우저 기본 confirm'}
          </strong>
        </p>
      </div>

      <div className="form-section">
        <h2>폼 테스트</h2>
        <div className="form-group">
          <label htmlFor="testInput">텍스트 입력:</label>
          <input
            id="testInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="여기에 입력하세요..."
          />
        </div>

        <div className="status">
          <p>
            변경사항 상태:
            <span className={hasUnsavedChanges ? 'unsaved' : 'saved'}>
              {hasUnsavedChanges ? '저장되지 않음' : '저장됨'}
            </span>
          </p>
        </div>

        <div className="buttons">
          <button onClick={handleSave} disabled={!hasUnsavedChanges}>
            저장
          </button>
          <button onClick={handleReset}>초기화</button>
        </div>
      </div>

      <div className="navigation-section">
        <h2>페이지 이탈 테스트</h2>
        <p>
          위의 입력 필드에 텍스트를 입력한 후 아래 방법들로 페이지를
          이탈해보세요:
        </p>

        <div className="test-buttons">
          <Link to="/about" className="link-button">
            📋 About 페이지로 이동 (Link)
          </Link>

          <button onClick={handleProgrammaticNavigation}>
            🔄 프로그래밍 방식으로 이동
          </button>

          <button onClick={() => (window.location.href = 'https://google.com')}>
            🌐 외부 링크로 이동
          </button>
        </div>

        <div className="test-instructions">
          <h3>테스트 방법:</h3>
          <ol>
            <li>위의 모달 유형을 선택하세요</li>
            <li>입력 필드에 텍스트를 입력하세요</li>
            <li>브라우저의 뒤로가기 버튼을 클릭해보세요</li>
            <li>브라우저 탭을 닫아보세요 (Cmd+W)</li>
            <li>새로고침을 해보세요 (Cmd+R)</li>
            <li>위의 링크들을 클릭해보세요</li>
          </ol>
        </div>
      </div>

      {/* 커스텀 모달 */}
      <CustomModal
        isOpen={modalOpen}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        message="변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?"
      />
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About 페이지</h1>
      <p>이곳은 About 페이지입니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">홈</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
