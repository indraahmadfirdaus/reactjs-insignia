import type { FC, ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title?: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
}

const Modal: FC<ModalProps> = ({
  open,
  title = "Konfirmasi",
  description,
  confirmText = "OK",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  loading = false,
  className = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={loading ? undefined : onCancel} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className={`relative w-full max-w-sm rounded-2xl bg-white shadow-xl p-5 ${className}`}>
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {description && <div className="text-sm text-gray-700 mb-4">{description}</div>}
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel} disabled={loading} className="rounded-full">
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading} className="rounded-full">
            {loading ? "Menghapus..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;