import Mapping from '../../Mapping/index.js';
import { Page } from 'puppeteer';

export default async function create({
  page,
  item,
  mapping
}: {
  page: Page;
  mapping: Mapping;
  item: Record<string, string>;
}) {
    POST https://groton.myschoolapp.com/api/Assignment2/List

    Payload
{
        "LongDescription": "DESCRIPTION",
        "SendNotification": false,
        "ShortDescription": "TITLE",
        "AssignmentTypeId": 3162,
        "PublishGrade": true,
        "IncCumGrade": true,
        "ExtraCredit": false,
        "AbbrDescription": "",
        "max-points": 10,
        "MaxPoints": 10,
        "Factor": "1",
        "RubricId": 0,
        "EvaluationMethod": 0,
        "AssignmentSkills": [],
        "AssignmentCourses": [],
        "inc-rubric": false,
        "IncRubric": false,
        "gradebook_ind": true,
        "IncGradebook": true,
        "Lti": [
            {
                "ProviderId": "662",
                "provider-id": "662",
                "ToolId": "0",
                "LaunchUrl": "LAUNCH_URL",
                "fileSubmissionInd": "0"
            }
        ],
        "inc-gradebook-lti": true,
        "DropboxInd": {
            "value": false
        },
        "assignment-instance": false,
        "RecurrenceNum": null,
        "recurrence-list": [],
        "DropboxTimeLate": "12:59:59 PM",
        "SectionLinks": [
            {
                "selected": true,
                "hasGrades": null,
                "HasEvaluation": null,
                "hasAssessmentResults": null,
                "SectionName": "Sandbox (Y) - Worlds Together",
                "AssignmentId": null,
                "AssignmentIndexId": null,
                "SectionId": 97900747,
                "OfferingId": 211147,
                "AssignmentDate": "08/20/2024",
                "AssignmentTime": "08:00:00",
                "dateDue": "2024-08-20T16:56:00.000Z",
                "DueDate": "08/20/2024",
                "DueTime": "08:00:00",
                "PublishInd": true,
                "PublishOnAssignedInd": false,
                "publishStatus": "1",
                "defaultPublishStatus": "1",
                "defaultTime": "08:00:00",
                "defaultDueTime": "08:00:00",
                "markingPeriods": [
                    {
                        "MarkingPeriodId": 18389,
                        "MarkingPeriodDescription": "Fall Term",
                        "BeginDate": "8/1/2024 12:00 AM",
                        "EndDate": "12/3/2024 12:00 AM",
                        "SectionId": 97900747
                    },
                    {
                        "MarkingPeriodId": 18390,
                        "MarkingPeriodDescription": "Winter Term",
                        "BeginDate": "12/4/2024 12:00 AM",
                        "EndDate": "3/30/2025 12:00 AM",
                        "SectionId": 97900747
                    },
                    {
                        "MarkingPeriodId": 18391,
                        "MarkingPeriodDescription": "Spring Term",
                        "BeginDate": "3/31/2025 12:00 AM",
                        "EndDate": "6/16/2025 12:00 AM",
                        "SectionId": 97900747
                    }
                ],
                "notification": true,
                "incGradebook": true,
                "markingPeriodId": 18389,
                "DropBoxSubmitted": null,
                "PartialInd": null,
                "PartialCount": null,
                "UsersList": []
            }
        ],
        "AssignmentUsers": [],
        "notifBodyControl_ShortDescription": "TITLE",
        "notifBodyControl_LongDescription": "DESCRIPTION",
        "DownloadItems": [],
        "LinkItems": []
    }
}
