/**
 *  Assistant Relay Device Handler
 *
 *  Copyright 2018 Greg Hesp
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at:
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License
 *  for the specific language governing permissions and limitations under the License.
 *
 */

 /*
    UPDATES:

    19th Jan:
      - Added Nest Camera supported
      - Fixed bug with customBroadcast user support

 */
metadata {
    definition (name: "Assistant Relay", namespace: "greghesp", author: "Greg Hesp") {
		capability "Actuator"
        command "customBroadcast", [ "string", "string" ]
        command "broadcast", [ "string" ]
        command "nestStartStream", ["string", "string", "string"]
        capability "Polling"
        capability "Refresh"
    }

    tiles(scale: 2) {
        standardTile("refresh", "device.refresh", inactiveLabel: false, decoration: "flat", height: 2, width: 2) {
            state "default", action:"refresh.refresh", icon:"st.secondary.refresh"
        }
        main("refresh")
    }
}

def customBroadcast(text, user) {
	def eText = URLEncoder.encode(text, "UTF-8");
  def eUser = URLEncoder.encode(user, "UTF-8");

  httpPostJSON("/customBroadcast?text=${eText}&user=${eUser}")
}

def broadcast(text) {
	def eText = URLEncoder.encode(text, "UTF-8");

  httpPostJSON("/broadcast?preset=${eText}")
}

def nestStartStream(camera, chromecast, user) {
	def eCam = URLEncoder.encode(camera, "UTF-8");
  def eChromecast = URLEncoder.encode(chromecast, "UTF-8");
  def eUser = URLEncoder.encode(user, "UTF-8");

  httpPostJSON("/nestStream?camera=${eCam}&chromecast=${eChromecast}&user=${eUser}")
}

def installed(){
    sendHubCommand(refresh() )
}
def updated(){
    sendHubCommand(refresh() )
}


// parse events into attributes
def parse(String description) {
    log.debug "Parsing '${description}'"
    def msg = parseLanMessage(description)
    log.debug "JSON: ${msg.json}"
}

def poll(){
    refresh()
}
def refresh(){

}

def sync(ip, port) {
    def existingIp = getDataValue("ip")
    def existingPort = getDataValue("port")
    if (ip && ip != existingIp) {
        updateDataValue("ip", ip)
    }
    if (port && port != existingPort) {
        updateDataValue("port", port)
    }
    refresh()
}

def httpPostJSON(path) {
	def hostUri = hostAddress
    log.debug "Sending command ${path} to ${hostUri}"
    def result = new physicalgraph.device.HubAction(
            method: "POST",
            path: path,
            headers: [
                    HOST: hostUri
            ]
    )
    //log.debug "Request: ${result.requestId}"
    return result
}


/*private getCallBackAddress() {
    return "http://" + device.hub.getDataValue("localIP") + ":" + device.hub.getDataValue("localSrvPortTCP")
}*/

private getHostAddress() {
    def ip = getDataValue("ip")
    def port = getDataValue("port")

    if (!ip || !port) {
        def parts = device.deviceNetworkId.split(":")
        if (parts.length == 2) {
            ip = parts[0]
            port = parts[1]
        } else {
            log.warn "Can't figure out ip and port for device: ${device.id}"
        }
    }

    log.debug "Using IP: $ip and port: $port for device: ${device.id}"
    return convertHexToIP(ip) + ":" + convertHexToInt(port)
}

private Integer convertHexToInt(hex) {
    return Integer.parseInt(hex,16)
}

private String convertHexToIP(hex) {
    return [convertHexToInt(hex[0..1]),convertHexToInt(hex[2..3]),convertHexToInt(hex[4..5]),convertHexToInt(hex[6..7])].join(".")
}
