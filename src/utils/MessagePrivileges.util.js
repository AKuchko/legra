const copyTextAction = {
  name: "Copy message",
  action: "copy-message-text",
  icon: "ion:copy",
};
const copyImageAction = {
  name: "Copy image",
  action: "copy-message-image",
  icon: "ion:images",
};
const forwardAction = {
  name: "Forward",
  action: "forward-message",
  icon: "ion:forward",
};
const deleteAction = {
  name: "Delete",
  action: "delete-message",
  icon: "ion:md-trash",
};
const replyAction = {
  name: "Reply",
  action: "reply-message",
  icon: "ion:reply",
};
const editAction = { name: "Edit", action: "edit-message", icon: "ion:edit" };

const definePrivileges = (msg, isOwner, userRole) => {
  const actions = [];
  actions.push(replyAction);
  if (msg.message) actions.push(copyTextAction);
  if (msg.media.length === 1) actions.push(copyImageAction);
  actions.push(forwardAction);
  if (isOwner & !msg.forward_id) {
    actions.push(editAction);
    actions.push(deleteAction);
  } else if (isOwner & msg.forward_id) {
    actions.push(deleteAction);
  } else if (userRole === "admin") {
    actions.push(deleteAction);
  }

  return actions;
};

export default { definePrivileges };
