import React from 'react';
import { Modal, Checkbox, Button } from 'antd';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  onAgree: () => void;
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ visible, onClose, onAgree, isAgreed, setIsAgreed }) => {
  return (
    <Modal
      title="이용약관"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          닫기
        </Button>,
        <Button key="submit" type="primary" onClick={onAgree} disabled={!isAgreed}>
          동의
        </Button>,
      ]}
    >
      <div>
        {/* 이용약관 내용 */}
        <p>여기에 이용약관 내용을 넣으세요...</p>
      </div>
      <Checkbox
        checked={isAgreed}
        onChange={(e) => setIsAgreed(e.target.checked)}
      >
        이용약관에 동의합니다
      </Checkbox>
    </Modal>
  );
};

export default TermsModal;
