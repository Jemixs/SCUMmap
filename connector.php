<?
require 'lib/rb-mysql.php';
R::setup( 'mysql:host=localhost;dbname=scumMap', 'root', '' );
if ( !R::testConnection() ) {
	exit('Dont finds stream! Please check connection.');
}

if (isset($_POST['url']) && !empty($_POST['url'])) {

	$book = R::findOne( 'map','url = ?',array($_POST['url'])); //Чекаем запись в БД с таким URL

	if (isset($_POST['type']) && $_POST['type'] == 'load') {
		if ($book) {
			$wss = '{
				"loaded":1,
				"markUser":
				'.$book->user_m.'
				,
				"markDraw":
				'.$book->user_d.',
				"read":'.$book->read_only.',
				"own":"'.$book->map_owner.'"
			}';
			print_r(json_encode($wss));
		}else{
			$wss = '{
				"loaded":0
			}';
			print_r(json_encode($wss));
		}
	}elseif (isset($_POST['type']) && $_POST['type'] == 'creat') {
		if ($book) {
			if ($_POST['class'] == 'draw') {
				$getUserDraw = json_decode($book->user_d, true);
				$getJsData = json_decode($_POST[data], true);
				$newUsDraw = $getUserDraw + $getJsData;
				$book->user_d = json_encode($newUsDraw);
				R::store($book);
				/*print_r($newUsDraw);*/
			}elseif ($_POST['class'] == 'marker') {
				$getUserMark = json_decode($book->user_m, true);
				$getJsData = json_decode($_POST[data], true);
				$newUsMark = $getUserMark + $getJsData;
				$book->user_m = json_encode($newUsMark);
				R::store($book);
				/*print_r($newUsMark);*/
			}
		}else{
			if (iconv_strlen($_POST[url]) == 7) {
				if ($_POST['class'] == 'marker') {
					$newMap = R::dispense('map');
					$newMap->url = $_POST[url];
					$newMap->user_m = "{$_POST['data']}";
					$newMap->user_d = "{}";
					$newMap->map_owner = $_POST[owner];
					R::store($newMap);
				}elseif ($_POST['class'] == 'draw') {
					$newMap = R::dispense('map');
					$newMap->url = $_POST[url];
					$newMap->user_m = "{}";
					$newMap->user_d = "{$_POST['data']}";
					$newMap->map_owner = $_POST[owner];
					R::store($newMap);
				}
			}
		}
	}elseif (isset($_POST['type']) && $_POST['type'] == 'update') {
		if ($book) {
			if ($_POST['class'] == 'marker') {
				if ($_POST[udp] == 'lat') {
					$decMass = json_decode($book->user_m,true);
					$newLat = $decMass[$_POST['markid']][latting] = $_POST['data'];
					$book->user_m = json_encode($decMass);
					R::store($book);
				}elseif ($_POST[udp] == 'name') {
					if (iconv_strlen($_POST[name]) <= 25) {
						$decMass = json_decode($book->user_m,true);
						$newName = $decMass[$_POST[markid]][name] = $_POST[name];
						$book->user_m = json_encode($decMass);
						R::store($book);
					}
				}
			}elseif ($_POST['class'] == 'draw') {
				$decMass = json_decode($book->user_d, true);
				$rebR = $decMass[$_POST['edId']][data] = $_POST['dataM'];
				$book->user_d = json_encode($decMass);
				R::store($book);
			}
		}
	}elseif (isset($_POST['type']) && $_POST['type'] == 'delete') {
		if ($book) {
			if ($_POST['class'] == 'draw') {
				$decMass = json_decode($book->user_d, true);
				unset($decMass[$_POST['edId']]);
				$return = (json_encode($decMass) == '[]') ? "{}":json_encode($decMass);
				$book->user_d = $return;
				R::store($book);
			}elseif ($_POST['class'] == 'marker') {
				$decMass = json_decode($book->user_m, true);
				unset($decMass[$_POST['markId']]);
				$return = (json_encode($decMass) == '[]') ? "{}":json_encode($decMass);
				$book->user_m = $return;
				/*print_r($return);*/
				R::store($book);
			}
		}
	}elseif (isset($_POST['type']) && $_POST['type'] == 'upSwich') {
		if ($book) {
			$stat = ($_POST[data] == 'true') ? 1:0;
			$book->read_only = $stat;
			R::store($book);
			echo $stat;
		}
	}
}