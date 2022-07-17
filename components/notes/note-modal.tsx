import * as React from "react";
import clsx from "clsx";
import { NoteDetailsProps } from "../../interfaces";

import { Dialog, Transition } from "@headlessui/react";
import { Button, Form, Input } from "antd";
import { post_notes_create, put_notes_update } from "../../api";
import {
  DeleteFilled,
  InboxOutlined,
  LoadingOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export const Note_Modal: React.FC<NoteDetailsProps> = ({
  isOpen,
  hide,
  typeAction,

  noteData,
  titleModal,

  isArchiving,
  handler_archieve,

  isDeleting,
  handler_delete,

  refetchData,
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>();

  const [form] = Form.useForm();

  // Function
  const onFinish = async (values: any): Promise<void> => {
    setIsLoading(true);

    const submitData: any = {
      title: values.title,
      text: values.text,
    };

    if (typeAction == "update" && noteData && noteData.id) {
      //   const update_response =
      await put_notes_update(noteData.id, submitData);

      //   console.log("<- Update note submit data ->", submitData);
      //   console.log("<- Update response ->", update_response);
    }

    if (typeAction == "create") {
      await post_notes_create(submitData);
    }

    await refetchData();
    setIsLoading(false);
    hide();
  };

  // React.useEffect(() => {
  //   console.log("<- Note Item Modal->", noteData);
  // }, [noteData]);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto w-full h-full"
        onClose={hide}
      >
        <div className="flex justify-center w-full h-full pt-[80px]">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-20" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Transition of content */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Container of the modal */}
            <div
              className={clsx(
                "transform transition-all overflow-auto align-middle",
                "bg-white shadow-xl rounded-2xl",
                "flex flex-col",
                "w-full max-w-[1000px] p-12"
              )}
            >
              <div className="flex justify-between gap-4">
                {/* Title */}
                <h1 className="text-3xl text-gray-900 mb-8">{titleModal}</h1>

                {/* Icons */}
                {typeAction == "update" && (
                  <div className="flex gap-4 w-auto">
                    {/* Archive */}
                    {noteData && !noteData.archived && !isArchiving && (
                      <InboxOutlined
                        onClick={handler_archieve}
                        style={{ fontSize: "18px" }}
                      />
                    )}
                    {noteData && noteData.archived && !isArchiving && (
                      <UploadOutlined
                        onClick={handler_archieve}
                        style={{ fontSize: "18px" }}
                      />
                    )}
                    {isArchiving && (
                      <LoadingOutlined style={{ fontSize: "18px" }} spin />
                    )}

                    {/* Delete */}
                    {!isDeleting && (
                      <DeleteFilled
                        onClick={handler_delete}
                        style={{ fontSize: "18px" }}
                      />
                    )}

                    {isDeleting && (
                      <LoadingOutlined style={{ fontSize: "18px" }} spin />
                    )}
                  </div>
                )}
              </div>

              {/* Modal */}
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
                initialValues={{
                  title: noteData?.title ?? "",
                  text: noteData?.text ?? "",
                }}
              >
                {/* Input title */}
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    { required: true, message: "Please write a note title!" },
                  ]}
                >
                  <Input placeholder="Enter the title of the note" />
                </Form.Item>

                {/* Input Text */}
                <Form.Item
                  label="Content"
                  name="text"
                  rules={[
                    {
                      required: true,
                      message: "Please the content of the note!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter the note description"
                  />
                </Form.Item>

                {/* Button */}
                <div className="flex flex-wrap justify-center gap-6 w-full">
                  {/* Cancel */}
                  <Form.Item className="w-auto">
                    <Button
                      type="primary"
                      danger
                      loading={isLoading}
                      onClick={hide}
                      className=""
                    >
                      Cancel
                    </Button>
                  </Form.Item>

                  {/* Submit */}
                  <Form.Item className="w-auto">
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={isLoading}
                      className=""
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Note_Modal;
