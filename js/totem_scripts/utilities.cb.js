var DAY = 1;
var WEEK = 7;
var MONTH = 30;
var YEAR = 365;

var AGGREGATE_15 = 15;
var AGGREGATE_30 = 30;
var AGGREGATE_60 = 60;

var today = new Date();

var DAY_CHART = {
  chart_title: "Daily power usage (" + today.toLocaleString("us-en", { month: "long" }).substr(0,3) + ". " + today.getDate() + ", " + today.getFullYear() + ")",
  chart_tickinterval: 60000  /* 60 * 1 * 1000 */
};

var WEEK_CHART = {
  chart_title: 'Last 7 days power usage',
  chart_tickinterval: 86400000 /* 3600*24*1*1000 */
};

var MONTH_CHART = {
  chart_title: "Month power usage (" + (today.toLocaleString("us-en", { month: "long" })) + " " + today.getFullYear() + ")",
  chart_tickinterval: 86400000 /* 3600*24*1*1000 */
};

var YEAR_CHART = {
  chart_title: "Annual power usage (" + today.getFullYear() + ")",
  chart_tickinterval: 2592000000  /* 3600*24*30*1000 */
};


var getColorPowerOffice = {
    'forza' : '#9b9b9b',
    'luci' : '#ffbe00',
    'clima' : '#1aa130'
};


var getColorRechargeSession = {
    0 : '#208A18',
    1 : '#2a52be',
    2 : '#df8b36',
    3 : '#c31f1f'
};


var getIndexPowerOffice = {
    'forza' : 2,
    'luci' : 0,
    'clima' : 1
};

var LINK_CLOUD = "http://131.175.21.162:8080/";

var LINK_HEADER_MEASUREMENTS_15 = "http://131.175.21.162:8080/measurements/15min/sensor/variable/";
var LINK_HEADER_MEASUREMENTS_60 = "http://131.175.21.162:8080/measurements/60min/sensor/variable/";
var LINK_HEADER_VARIABLES = "http://131.175.21.162:8080/variables/";
var LINK_HEADER_VARIABLES_CLASS_ROOM = "http://131.175.21.162:8080/variables/room/";
var LINK_VARIABLE_CLASS = "/variableclass/"

var ACTIVE_POWER_LABEL = "potenza attiva meter";
var ACTIVE_ENERGY_LABEL = "energia attiva meter";
var ACTIVE_POWER_GEN_LABEL  = "potenza attiva";
var ACTIVE_ENERGY_GEN_LABEL  = "energia attiva";
var TEMPERATURE_LABEL = "temperatura";

var CHART_POWER_MS_ID = "#powermeter_chart_ms";
var CHART_VAR_MS_ID = "#variable_chart_ms";


var MAX_RECHARGE_LIST = 10;

/* generates the day / 7 days / month /year  menu for a given monitored data */
/* variable: power temperature humidity ... */
function menu_section(variable, button, filter)
{
	var html = '';

//	html = html + '<section id="' + variable + '_section">';
//	html = html + '   <div class="section-heading scrollpoint sp-effect3">';
//	html = html + '     <h1>' + title + ' Info Charts</h1>';
	html = html + '     <div class="divider"></div>';
	html = html + '		<div class="filter", id="' + variable + '_filter">';
	html = html + '			<a  id="today_' + button + '" class="button js-filter-' + filter + ' active sp-effect1" >';
	html = html + '				<div class="stacked-icons">';
	html = html + '					<span class="fa-stack fa-lg"><i class="fa fa-calendar-o fa-stack-2x fa-fw"></i>';
	if(variable == 'power')
		html = html + '						<strong class="fa-stack-1x calendar-text" id="e_today"></strong>';
	else
		html = html + '						<strong class="fa-stack-1x calendar-text" id="t_today"></strong>';
	html = html + '					</span><span>Today</span>';
	html = html + '				</div>';
	html = html + '			</a>';
	html = html + '			<a  id="week_' + button + '" class="button js-filter-' + filter + ' sp-effect1" >';
	html = html + '				<div class="stacked-icons">';
	html = html + '					<span class="fa-stack fa-lg"><i class="fa fa-circle-thin fa-stack-2x fa-fw"></i>';
	html = html + '						<strong class="fa-stack-1x">7</strong>';
	html = html + '					</span><span>Last 7 days</span>';
	html = html + '				</div>';
	html = html + '			</a>';
	html = html + '			<a  id="month_' + button + '" class="button js-filter-' + filter + ' sp-effect1" >';
	html = html + '				<div class="stacked-icons">';
	html = html + '					<span class="fa-stack fa-lg"><i class="fa fa-circle-thin fa-stack-2x fa-fw"></i>';
	html = html + '						<strong class="fa-stack-1x">31</strong>';
	html = html + '					</span><span>This month</span>';
	html = html + '				</div>';
	html = html + '			</a>';
	html = html + '			<a  id="year_' + button + '" class="button js-filter-' + filter + ' sp-effect1" >';
	html = html + '				<div class="stacked-icons">';
	html = html + '					<span class="fa-stack fa-lg"><i class="fa fa-circle-thin fa-stack-2x fa-fw"></i>';
	html = html + '						<strong class="fa-stack-1x">Y</strong>';
	html = html + '					</span><span>This year</span>';
	html = html + '				</div>';
	html = html + '			</a>';
	html = html + '		</div>';
//	html = html + '      <div id="' + charttitle + '" style="min-width: 300px; height: 400px; margin: 0 auto;"></div>';
//	html = html + '   </div>';
//	html = html + '</section>';
	return html;

}



function datetime2unixts(idate, itime)
{
	return Date.parse(idate + " " + itime).getTime()/1000;
}

function formatDate(idate)
{
	var dp = idate.split("-");
	return dp[2] + "-" + dp[1] + "-" + dp[0];
}

function modifyString(string){
  
  if(string.toLowerCase().indexOf("edificio") >= 0){ //hard-translation in english
               string = string.replace("edificio","building");
   }else if(string.toLowerCase().indexOf("ufficio") >= 0){ //hard-translation in english
               string = string.replace("ufficio","office");
   }else if(string.toLowerCase().indexOf("aula") >= 0){ //hard-translation in english
               string = string.replace("aule","classroom");
   }
   
  return string.charAt(0).toUpperCase() + string.slice(1);
}
