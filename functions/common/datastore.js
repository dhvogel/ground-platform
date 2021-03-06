/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
'use strict';

class Datastore {
  constructor(db) {
    this.db_ = db;
  }  

  fetch_(docRef) {
    return docRef.get().then(doc => doc.exists ? doc.data() : null);
  }

  fetchDoc_(path) {
    return this.fetch_(this.db_.doc(path));    
  }

  fetchCollection_(path) {
    return this.db_.collection(path).get();
  }

  fetchProject(projectId) {
    return this.db_.doc(`projects/${projectId}`).get();
  }

  fetchRecord(projectId, featureId, recordId) {
    return this.fetchDoc_(`projects/${projectId}/features/${featureId}/records/${recordId}`);
  }

  fetchRecords(projectId, featureId) {
    return this.fetchCollection_(`projects/${projectId}/features/${featureId}/records`);
  }

  fetchFeature(projectId, featureId) {
    return this.fetchDoc_(`projects/${projectId}/features/${featureId}`);
  }

  fetchFeatures(projectId) {
    return this.fetchCollection_(`projects/${projectId}/features`);
  }

  fetchForm(projectId, featureTypeId, formId) {
    return this.fetchDoc_(`projects/${projectId}/featureTypes/${featureTypeId}/forms/${formId}`);
  }

  fetchSheetsConfig(projectId) {
    return this.fetchDoc_(`projects/${projectId}/sheets/config`);
  }
}

module.exports = Datastore;