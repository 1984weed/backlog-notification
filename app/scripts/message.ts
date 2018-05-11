export const getLabel = (notificationData: BacklogNotification, lang: "en") => 
    actionToComment(new NotificationData(notificationData))[lang]

const actionToComment = (nd: NotificationData): {en: string} => {
    switch (nd.reason) {
        case NotificationType.ADD_ISSUE:
            return {en: `${nd.senderName} has added you to ${nd.projectName}`};
        case NotificationType.UPDATE_ISSUE:
            return {en: `${nd.senderName} has updated an issue. ${nd.issueKey} ${nd.comment}`};
        case NotificationType.ADD_COMMENT_ISSUE:
            return {en: `${nd.senderName} has updated an issue. ${nd.issueKey} ${nd.comment}`};
        case NotificationType.JOIN_PROJECT:
            return {en: `${nd.senderName} has had you join ${nd.projectName}`};
        case NotificationType.ADD_NOTIFY_TO_COMMENT:
            return {en: `${nd.senderName} has just notified you. ${nd.projectName}`}
        case NotificationType.ADD_PR:
            return {en: `${nd.senderName} has created a PR. ${nd.projectName}`};
        case NotificationType.UPDATE_PR:
            return {en: `${nd.senderName} has updated a PR. ${nd.comment}`};
        case NotificationType.COMMENT_PR:
            return {en: `${nd.senderName} has commented to the PR. ${nd.comment}`};
        default:
            return {en: ""};
    }
}

enum NotificationType {
    ADD_ISSUE = 1,
    UPDATE_ISSUE = 2,
    ADD_COMMENT_ISSUE = 3,
    JOIN_PROJECT = 16,
    ADD_NOTIFY_TO_COMMENT = 17,
    ADD_PR = 18,
    UPDATE_PR = 19,
    COMMENT_PR = 20
}

export interface BacklogNotification {
    id: number;
    sender: {
        name: string
    }
    project: {
        name: string
    }
    issue: {
        issueKey: string
        summary: string
    }
    comment: {
        content: string
    }
    reason: NotificationType
}

export class NotificationData {
    constructor(private data: BacklogNotification) { 
    }

    get senderName() {
        return this.data.sender.name
    }

    get projectName() {
        return this.data.project.name
    }

    get issueKey() {
        return this.data.issue.issueKey
    }

    get comment() {
        return this.data.comment.content
    }

    get summary() {
        return this.data.issue.summary
    }

    get reason() {
        return this.data.reason;
    }
}