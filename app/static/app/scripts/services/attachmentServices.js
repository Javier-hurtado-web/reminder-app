var attachmentServices = angular.module("remember.attachmentServices", ["ngResource"]);

attachmentServices.factory("Attachment", function($resource){
    return $resource("/remember/api/v1.0/attachments/:id", {id: "@id"}, { update: { method: "PUT" }});
});     

attachmentServices.factory("AttachmentListLoader", function(Attachment, $q){
    return function(){
        var delay = $q.defer();
        
        Attachment.get(function(attachments){
            delay.resolve(attachments);
        }, function(){
            delay.reject("Unable to fetch attachments");
        });
        
        return delay.promise;
    }
});    

attachmentServices.factory('AttachmentUploader', function ($http) {
    return function(attachment){
        var fd = new FormData();
        fd.append("file", attachment.file);
        fd.append("tags", attachment.tagInfo.selectedTags);
        
        return $http.post("/remember/api/v1.0/attachments", fd, {
            transformRequest: angular.identity,
            headers: {"Content-Type": undefined}
        })
    }
});
